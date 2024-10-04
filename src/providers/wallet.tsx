import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { readWalletFromStorage, saveWalletToStorage } from '../lib/storage'
import { NavigationContext, Pages } from './navigation'
import { NetworkName } from '../lib/network'
import { Tx } from '../lib/types'
import { ExplorerName } from '../lib/explorers'
import { defaultExplorer, defaultNetwork } from '../lib/constants'
import { claimVtxos, getAspInfo, getBalance, getTxHistory } from '../lib/asp'
import { AspContext } from './asp'

export interface Wallet {
  arkAddress: string
  balance: number
  explorer: ExplorerName
  initialized: boolean
  lastUpdate: number
  network: NetworkName
  password: string
  privateKey: string
  txs: Tx[]
}

const defaultWallet: Wallet = {
  arkAddress: '',
  balance: 0,
  explorer: defaultExplorer,
  initialized: false,
  lastUpdate: 0,
  network: defaultNetwork,
  password: '',
  privateKey: '',
  txs: [],
}

interface WalletContextProps {
  initWallet: (password: string, privateKey: string) => Promise<void>
  lockWallet: (password: string) => Promise<void>
  reloadWallet: () => void
  resetWallet: () => void
  setPrivateKey: (key: string) => void
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
  reloadWallet: () => {},
  resetWallet: () => {},
  settlePending: () => Promise.resolve(),
  setPrivateKey: () => {},
  unlockWallet: () => Promise.resolve(),
  updateWallet: () => {},
  walletUnlocked: false,
  wallet: defaultWallet,
  wasmLoaded: false,
})

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { setAspInfo, aspInfo } = useContext(AspContext)
  const { navigate } = useContext(NavigationContext)

  const [walletUnlocked, setWalletUnlocked] = useState(false)
  const [wasmLoaded, setWasmLoaded] = useState(false)
  const [wallet, setWallet] = useState(defaultWallet)

  useEffect(() => {
    if (wasmLoaded) return
    const go = new window.Go()
    WebAssembly.instantiateStreaming(fetch('https://arkadewasm.bordalix.workers.dev?21'), go.importObject).then(
      (result) => {
        go.run(result.instance)
        setWasmLoaded(true)
        console.log('wasm loaded')
      },
    )
    getAspInfo(wallet.network).then(setAspInfo)
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

  const initWallet = async (password: string, privateKey: string) => {
    const aspUrl = aspInfo.url
    const chain = 'bitcoin'
    const clientType = 'rest'
    const walletType = 'singlekey'
    await window.init(walletType, clientType, aspUrl, privateKey, password, chain)
    updateWallet({ ...wallet, initialized: true })
  }

  const lockedWallet = async () => {
    try {
      return await window.locked()
    } catch (err) {
      return true
    }
  }

  const lockWallet = async (password: string) => {
    try {
      await window.lock(password)
      setWalletUnlocked(false)
      reloadWallet()
    } catch (err) {
      throw 'Invalid password'
    }
  }

  const reloadWallet = async () => {
    const balance = await getBalance()
    const txs = await getTxHistory()
    const now = Math.floor(new Date().getTime() / 1000)
    updateWallet({ ...wallet, balance, lastUpdate: now, txs })
  }

  const resetWallet = async () => {
    updateWallet(defaultWallet)
    setWalletUnlocked(false)
    navigate(Pages.Init)
  }

  const settlePending = async () => {
    await claimVtxos()
    await reloadWallet()
  }

  const setPrivateKey = (privateKey: string) => {
    setWallet({ ...wallet, privateKey })
  }

  const unlockWallet = async (password: string) => {
    try {
      await window.unlock(password)
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
        reloadWallet,
        resetWallet,
        setPrivateKey,
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
