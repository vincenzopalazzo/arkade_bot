import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { clearStorage, readWalletFromStorage, saveWalletToStorage } from '../lib/storage'
import { NavigationContext, Pages } from './navigation'
import { getRestApiExplorerURL } from '../lib/explorers'
import { getBalance, getTxHistory, getVtxos, renewCoins, settleVtxos } from '../lib/asp'
import { AspContext } from './asp'
import { NotificationsContext } from './notifications'
import { FlowContext } from './flow'
import { arkNoteInUrl } from '../lib/arknote'
import { consoleError } from '../lib/logs'
import { Tx, Vtxo, Wallet } from '../lib/types'
import { calcNextRollover } from '../lib/wallet'
import {
  ArkNote,
  ServiceWorkerWallet,
  Wallet as ArkWallet,
  SingleKey,
  setupServiceWorker,
  type IWallet,
  NetworkName,
} from '@arkade-os/sdk'
import { hex } from '@scure/base'
import * as secp from '@noble/secp256k1'

const defaultWallet: Wallet = {
  network: '',
  nextRollover: 0,
}

interface WalletContextProps {
  initWallet: (seed: Uint8Array) => Promise<void>
  lockWallet: () => Promise<void>
  resetWallet: () => Promise<void>
  settlePreconfirmed: () => Promise<void>
  updateWallet: (w: Wallet) => void
  isLocked: () => Promise<boolean>
  reloadWallet: () => Promise<void>
  wallet: Wallet
  walletLoaded: Wallet | undefined
  svcWallet: IWallet | undefined
  txs: Tx[]
  vtxos: { spendable: Vtxo[]; spent: Vtxo[] }
  balance: number
  initialized?: boolean
}

export const WalletContext = createContext<WalletContextProps>({
  initWallet: () => Promise.resolve(),
  lockWallet: () => Promise.resolve(),
  resetWallet: () => Promise.resolve(),
  settlePreconfirmed: () => Promise.resolve(),
  updateWallet: () => {},
  reloadWallet: () => Promise.resolve(),
  wallet: defaultWallet,
  walletLoaded: undefined,
  svcWallet: undefined,
  isLocked: () => Promise.resolve(true),
  balance: 0,
  txs: [],
  vtxos: { spendable: [], spent: [] },
})

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { aspInfo } = useContext(AspContext)
  const { setNoteInfo, noteInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyTxSettled } = useContext(NotificationsContext)

  const [walletLoaded, setWalletLoaded] = useState<Wallet>()
  const [wallet, setWallet] = useState(defaultWallet)
  const [svcWallet, setSvcWallet] = useState<IWallet>()
  const serviceWorkerSupported = typeof navigator !== 'undefined' && 'serviceWorker' in navigator

  const [vtxos, setVtxos] = useState<{ spendable: Vtxo[]; spent: Vtxo[] }>({ spendable: [], spent: [] })
  const [txs, setTxs] = useState<Tx[]>([])
  const [balance, setBalance] = useState(0)
  const [initialized, setInitialized] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!svcWallet) return

    isLocked().then((locked) => {
      if (locked) return
      // update the txs history list
      getTxHistory(svcWallet).then(setTxs).catch(consoleError)
      // update the balance
      getBalance(svcWallet).then(setBalance).catch(consoleError)
    })

    // update the next rollover date
    if (vtxos?.spendable && vtxos?.spendable.length > 0) {
      const nextRollover = calcNextRollover(aspInfo.vtxoTreeExpiry, vtxos?.spendable)
      updateWallet({ ...wallet, nextRollover })
    }
  }, [vtxos, svcWallet])

  const reloadWallet = async (swWallet = svcWallet) => {
    if (!swWallet) return
    try {
      const vtxos = await getVtxos(swWallet)
      const txs = await getTxHistory(swWallet)
      const balance = await getBalance(swWallet)
      setBalance(balance)
      setVtxos(vtxos)
      setTxs(txs)
    } catch (err) {
      consoleError(err, 'Error reloading wallet')
      return
    }
  }

  useEffect(() => {
    if (!serviceWorkerSupported) {
      setInitialized(false)
      return
    }
    let pingInterval: NodeJS.Timeout
    async function initSvcWorkerWallet() {
      try {
        const serviceWorker = await setupServiceWorker('/wallet-service-worker.mjs')
        const swWallet = new ServiceWorkerWallet(serviceWorker)
        setSvcWallet(swWallet)

        // handle messages from the service worker
        // we listen for UTXO/VTXO updates to refresh the tx history and balance
        const handleServiceWorkerMessages = (event: MessageEvent) => {
          if (event.data && event.data.type === 'RELOAD_PAGE') {
            window.location.reload()
          }
          if (event.data && ['VTXO_UPDATE', 'UTXO_UPDATE'].includes(event.data.type)) {
            reloadWallet(swWallet)
            // reload again after a delay to give the indexer time to update its cache
            setTimeout(() => reloadWallet(swWallet), 5000)
          }
        }

        navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessages)

        const { walletInitialized } = await swWallet.getStatus()
        setInitialized(walletInitialized)

        // ping the service worker wallet status every 1-2 seconds
        // increased interval for iOS to avoid performance issues in WebView
        const isIOS = window.navigator.userAgent.includes('iPhone') || window.navigator.userAgent.includes('iPad')
        const pingDelay = isIOS ? 2_000 : 1_000
        pingInterval = setInterval(async () => {
          try {
            const { walletInitialized } = await swWallet.getStatus()
            setInitialized(walletInitialized)
          } catch (err) {
            consoleError(err, 'Error pinging wallet status')
          }
        }, pingDelay)

        // renew expiring coins on startup
        renewCoins(swWallet).catch(() => {})
      } catch (err) {
        consoleError(err, 'Error initializing service worker wallet')
        // On iOS in WebView, service worker initialization might fail
        // Set a timeout to retry initialization
        const isIOS = window.navigator.userAgent.includes('iPhone') || window.navigator.userAgent.includes('iPad')
        if (isIOS) {
          setTimeout(() => {
            initSvcWorkerWallet()
          }, 2000)
        }
      }
    }
    initSvcWorkerWallet()
    return () => clearInterval(pingInterval)
  }, [serviceWorkerSupported])

  useEffect(() => {
    const note = arkNoteInUrl()
    if (!note) return
    try {
      const { value } = ArkNote.fromString(note).data
      setNoteInfo({ note, satoshis: value })
      window.location.hash = ''
    } catch (err) {
      consoleError(err, 'error decoding ark note ')
    }
  }, [])

  // load wallet from storage
  useEffect(() => {
    const walletFromStorage = readWalletFromStorage()
    setWalletLoaded(walletFromStorage)
    if (walletFromStorage) setWallet(walletFromStorage)
  }, [])

  // if voucher present, go to redeem page
  useEffect(() => {
    if (!initialized) return
    navigate(noteInfo.satoshis ? Pages.NotesRedeem : Pages.Wallet)
  }, [initialized, noteInfo.satoshis])

  const initWallet = async (privateKey: Uint8Array) => {
    const arkServerUrl = aspInfo.url
    const network = aspInfo.network as NetworkName
    const esploraUrl = getRestApiExplorerURL(network) ?? ''
    const pubkey = hex.encode(secp.getPublicKey(privateKey))

    if (serviceWorkerSupported) {
      if (!svcWallet || !(svcWallet instanceof ServiceWorkerWallet)) throw new Error('Service worker not initialized')
      await svcWallet.init({
        arkServerUrl,
        privateKey: hex.encode(privateKey),
        network,
        esploraUrl,
      })
      updateWallet({ ...wallet, network, pubkey })
      setInitialized(true)
    } else {
      const identity = SingleKey.fromHex(hex.encode(privateKey))
      const directWallet = await ArkWallet.create({
        network,
        identity,
        arkServerUrl,
        esploraUrl,
      })
      setSvcWallet(directWallet)
      updateWallet({ ...wallet, network, pubkey })
      setInitialized(true)
    }
  }

  const lockWallet = async () => {
    if (serviceWorkerSupported) {
      if (!svcWallet || !(svcWallet instanceof ServiceWorkerWallet)) throw new Error('Service worker not initialized')
      await svcWallet.clear()
    }
    setSvcWallet(undefined)
    setInitialized(false)
  }

  const resetWallet = async () => {
    if (serviceWorkerSupported) {
      if (!svcWallet || !(svcWallet instanceof ServiceWorkerWallet)) throw new Error('Service worker not initialized')
      await svcWallet.clear()
    }
    setSvcWallet(undefined)
    setInitialized(false)
    await clearStorage()
  }

  const settlePreconfirmed = async () => {
    if (!svcWallet) throw new Error('Wallet not initialized')
    await settleVtxos(svcWallet)
    notifyTxSettled()
  }

  const updateWallet = async (data: Wallet) => {
    setWallet({ ...data })
    saveWalletToStorage(data)
  }

  const isLocked = async () => {
    if (!svcWallet) return true
    if (serviceWorkerSupported && svcWallet instanceof ServiceWorkerWallet) {
      try {
        const { walletInitialized } = await svcWallet.getStatus()
        return !walletInitialized
      } catch {
        return true
      }
    }
    return false
  }

  return (
    <WalletContext.Provider
      value={{
        initWallet,
        isLocked,
        initialized,
        resetWallet,
        settlePreconfirmed,
        updateWallet,
        wallet,
        walletLoaded,
        svcWallet,
        lockWallet,
        txs,
        balance,
        reloadWallet,
        vtxos: vtxos ?? { spendable: [], spent: [] },
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
