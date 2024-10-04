import { Encrypted, decrypt, encrypt } from './encryption'
import { Config } from '../providers/config'
import { Wallet } from '../providers/wallet'

export const clearStorage = () => {
  return localStorage.clear()
}

export const saveConfigToStorage = (config: Config): void => {
  localStorage.setItem('config', JSON.stringify(config))
}

export const readConfigFromStorage = (): Config | undefined => {
  const config = localStorage.getItem('config')
  return config ? JSON.parse(config) : undefined
}

export const saveWalletToStorage = (wallet: Wallet): void => {
  localStorage.setItem('wallet', JSON.stringify(wallet))
}

export const readWalletFromStorage = (): Wallet | undefined => {
  const data = localStorage.getItem('wallet')
  if (!data) return undefined
  const wallet = JSON.parse(data)
  return wallet
}

export const saveMnemonicToStorage = async (mnemonic: string, password: string): Promise<void> => {
  const encrypted = await encrypt(mnemonic, password)
  localStorage.setItem('mnemonic', JSON.stringify(encrypted))
}

export const readMnemonicFromStorage = async (password: string): Promise<string | undefined> => {
  const encrypted = localStorage.getItem('mnemonic') as string
  return encrypted ? await decrypt(JSON.parse(encrypted) as Encrypted, password) : undefined
}
