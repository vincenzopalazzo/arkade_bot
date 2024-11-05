import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { readWalletFromStorage, saveWalletToStorage } from '../lib/storage'
import { NavigationContext, Pages } from './navigation'
import { Tx, Vtxo } from '../lib/types'
import { getRestApiExplorerURL } from '../lib/explorers'
import {
  settleVtxos,
  getBalance,
  getReceivingAddresses,
  getTxHistory,
  getVtxos,
  lock,
  sendOffChain,
  unlock,
  walletLocked,
  getAspInfo,
} from '../lib/asp'
import { AspContext } from './asp'
import { NotificationsContext } from './notifications'
import { ConfigContext } from './config'
import { FlowContext } from './flow'
import { ArkNote, arkNoteInUrl } from '../lib/arknote'

export interface Wallet {
  arkAddress: string
  balance: number
  explorer: string
  initialized: boolean
  lastUpdate: number
  network: string
  nextRecycle: number
  txs: Tx[]
  vtxos: {
    spendable: Vtxo[]
    spent: Vtxo[]
  }
}

const defaultWallet: Wallet = {
  arkAddress: '',
  balance: 0,
  explorer: '',
  initialized: false,
  lastUpdate: 0,
  network: '',
  nextRecycle: 0,
  txs: [],
  vtxos: {
    spendable: [],
    spent: [],
  },
}

interface WalletContextProps {
  initWallet: (password: string, privateKey: string) => Promise<void>
  lockWallet: (password: string) => Promise<void>
  recycleVtxos: () => Promise<void>
  reloadWallet: () => void
  resetWallet: () => void
  settlePending: () => Promise<void>
  updateWallet: (w: Wallet) => void
  unlockWallet: (password: string) => Promise<void>
  walletUnlocked: boolean
  wallet: Wallet
  wasmLoaded: boolean
}

export const WalletContext = createContext<WalletContextProps>({
  initWallet: () => Promise.resolve(),
  lockWallet: () => Promise.resolve(),
  recycleVtxos: () => Promise.resolve(),
  reloadWallet: () => {},
  resetWallet: () => {},
  settlePending: () => Promise.resolve(),
  unlockWallet: () => Promise.resolve(),
  updateWallet: () => {},
  walletUnlocked: false,
  wallet: defaultWallet,
  wasmLoaded: false,
})

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { setAspInfo, aspInfo } = useContext(AspContext)
  const { config, resetConfig } = useContext(ConfigContext)
  const { noteInfo, setNoteInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyVtxosRecycled, notifyTxSettled } = useContext(NotificationsContext)

  const [walletUnlocked, setWalletUnlocked] = useState(false)
  const [wasmLoaded, setWasmLoaded] = useState(false)
  const [wallet, setWallet] = useState(defaultWallet)

  useEffect(() => {
    if (wasmLoaded) return
    const go = new window.Go()
    const devMode = false
    const sdkFile = 'ark-sdk-62c7340.wasm'
    const r2 = 'https://pub-2691569bbfd24a6a81b70001c8eb7506.r2.dev/'
    const url = devMode ? sdkFile : r2 + sdkFile
    WebAssembly.instantiateStreaming(fetch(url), go.importObject).then((result) => {
      go.run(result.instance)
      setWasmLoaded(true)
      console.log('wasm loaded')
    })
  }, [])

  useEffect(() => {
    if (!wasmLoaded || walletUnlocked) return
    const wallet = readWalletFromStorage()
    if (!wallet || !wallet.initialized) {
      updateWallet(defaultWallet)
      navigate(Pages.Init)
    } else {
      updateWallet(wallet)
      lockedWallet().then((locked) => {
        navigate(locked ? Pages.Unlock : Pages.Wallet)
      })
    }
  }, [wasmLoaded])

  // calculate next roll over date
  useEffect(() => {
    if (!wallet.nextRecycle || !walletUnlocked) return
    const now = Math.floor(new Date().getTime() / 1000)
    const threshold = 60 * 60 * 24 // one day in seconds
    const urgent = wallet.nextRecycle - now < threshold
    if (urgent) settleVtxos().then(() => recycleVtxos())
  }, [wallet.nextRecycle, walletUnlocked])

  // if voucher present, go to redeem page
  useEffect(() => {
    if (!walletUnlocked || !wallet.initialized) return
    if (noteInfo.satoshis) navigate(Pages.NoteRedeem)
    // startListenTransactionStream(reloadWallet)
  }, [walletUnlocked, wallet.initialized])

  // if voucher on url, add it to state and remove from url
  useEffect(() => {
    if (walletUnlocked || !arkNoteInUrl()) return
    const note = arkNoteInUrl()
    try {
      const { value } = ArkNote.fromString(note).data
      setNoteInfo({ note, satoshis: value })
      window.location.hash = ''
    } catch (_) {}
    // startListenTransactionStream(reloadWallet)
  }, [walletUnlocked])

  useEffect(() => {
    getAspInfo(config.aspUrl).then(setAspInfo)
  }, [config.aspUrl])

  useEffect(() => {
    if (!wasmLoaded || !aspInfo.network) return
    updateWallet({ ...wallet, network: aspInfo.network })
  }, [aspInfo.network, wasmLoaded])

  const initWallet = async (password: string, privateKey: string) => {
    const aspUrl = aspInfo.url
    const chain = 'bitcoin'
    const clientType = 'rest'
    const walletType = 'singlekey'
    const explorerUrl = getRestApiExplorerURL(wallet.network) ?? ''
    await window.init(walletType, clientType, aspUrl, privateKey, password, chain, explorerUrl)
    updateWallet({ ...wallet, initialized: true })
  }

  const lockedWallet = async () => {
    try {
      return await walletLocked()
    } catch (err) {
      return true
    }
  }

  const lockWallet = async (password: string) => {
    try {
      await lock(password)
      setWalletUnlocked(false)
      reloadWallet()
    } catch (err) {
      throw 'Invalid password'
    }
  }

  const recycleVtxos = async () => {
    const { offchainAddr } = await getReceivingAddresses()
    const amount = wallet.vtxos.spendable.reduce((acc, cur) => acc + cur.amount, 0)
    await sendOffChain(amount, offchainAddr)
    await reloadWallet()
    notifyVtxosRecycled()
  }

  const reloadWallet = async () => {
    console.log('reloading wallet')
    const vtxos = await getVtxos()
    const balance = await getBalance()
    const txs = await getTxHistory()
    const now = Math.floor(new Date().getTime() / 1000)
    const nextRecycle = vtxos.spendable
      ? vtxos.spendable.reduce((acc, cur) => {
          const unixtimestamp = Math.floor(new Date(cur.expireAt).getTime() / 1000)
          return unixtimestamp < acc || acc === 0 ? unixtimestamp : acc
        }, 0)
      : 0
    updateWallet({ ...wallet, balance, initialized: true, lastUpdate: now, nextRecycle, txs, vtxos })
  }

  const resetWallet = async () => {
    resetConfig()
    updateWallet(defaultWallet)
    setWalletUnlocked(false)
    navigate(Pages.Init)
  }

  const settlePending = async () => {
    await settleVtxos()
    await reloadWallet()
    notifyTxSettled()
  }

  const unlockWallet = async (password: string) => {
    try {
      await unlock(password)
      setWalletUnlocked(true)
      reloadWallet()
    } catch (err) {
      throw 'Invalid password'
    }
  }

  const updateWallet = (data: Wallet) => {
    setWallet(data)
    saveWalletToStorage(data)
  }

  return (
    <WalletContext.Provider
      value={{
        initWallet,
        lockWallet,
        recycleVtxos,
        reloadWallet,
        resetWallet,
        settlePending,
        unlockWallet,
        updateWallet,
        walletUnlocked,
        wallet,
        wasmLoaded,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
