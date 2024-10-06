import { defaultDust, defaultMinRelayFee, defaultNetwork, defaultRoundInterval } from './constants'
import { NetworkName } from './network'
import { Satoshis, Tx } from './types'

export const emptyAspInfo = {
  boardingDescriptorTemplate: '',
  dust: defaultDust,
  forfeitAddress: '',
  minRelayFee: 0,
  network: defaultNetwork,
  pubkey: '',
  roundInterval: 0,
  roundLifetime: 0,
  unilateralExitDelay: 0,
  url: '',
}

const aspMap = {
  [NetworkName.Liquid]: 'https://asp-liquid.arkdev.info',
  [NetworkName.Regtest]: 'http://localhost:7070',
  [NetworkName.Signet]: 'https://insiders.signet.arklabs.to',
  [NetworkName.Testnet]: 'https://asp.arkdev.info',
}

const headers = { 'Content-Type': 'application/json' }

const get = async (endpoint: string, net: NetworkName) => {
  const response = await fetch(aspMap[net] + endpoint, { headers })
  return await response.json()
}

export const claimVtxos = async () => {
  await window.claim()
}

export interface AspInfo {
  boardingDescriptorTemplate: string
  dust: number
  forfeitAddress: string
  minRelayFee: number
  network: NetworkName
  pubkey: string
  roundInterval: number
  roundLifetime: number
  unilateralExitDelay: number
  url: string
}

export const getAspInfo = async (net: NetworkName): Promise<AspInfo> => {
  const {
    boardingDescriptorTemplate,
    dust,
    forfeitAddress,
    minRelayFee,
    network,
    pubkey,
    roundInterval,
    roundLifetime,
    unilateralExitDelay,
  } = await get('/v1/info', net)
  return {
    boardingDescriptorTemplate,
    dust: dust ? Number(dust) : defaultDust,
    forfeitAddress,
    minRelayFee: minRelayFee ? Number(minRelayFee) : defaultMinRelayFee,
    network: network ? (network as NetworkName) : defaultNetwork,
    pubkey,
    roundInterval: roundInterval ? Number(roundInterval) : defaultRoundInterval,
    roundLifetime: Number(roundLifetime),
    unilateralExitDelay: Number(unilateralExitDelay),
    url: aspMap[net],
  }
}

export const getBalance = async (): Promise<Satoshis> => {
  const balance = await window.balance(false)
  if (!balance) return 0
  const { offchainBalance, onchainBalance } = balance
  return offchainBalance + onchainBalance.spendable + onchainBalance.locked
}

export const getPrivateKey = async () => {
  return await window.dump()
}

export const getTxHistory = async (): Promise<Tx[]> => {
  const txs: Tx[] = []
  try {
    const res = await window.getTransactionHistory()
    console.log('res', res)
    if (!res) return []
    for (const tx of JSON.parse(res)) {
      const date = new Date(tx.createdAt)
      const unix = Math.floor(date.getTime() / 1000)
      txs.push({
        amount: parseInt(tx.amount, 10),
        boardingTxid: tx.boardingTxid,
        createdAt: unix,
        isPending: tx.isPending,
        redeemTxid: tx.redeemTxid,
        roundTxid: tx.roundTxid,
        type: tx.type,
      })
    }
  } catch (_) {
    return []
  }
  return txs
}

export const getReceivingAddresses = async (): Promise<{ offchainAddr: string; boardingAddr: string }> => {
  return await window.receive()
}

export const sendAsync = async (sats: number, address: string): Promise<string> => {
  console.log('Sending async', sats, address)
  return await window.sendAsync(false, [{ To: address, Amount: sats }])
}

export const sendOffchain = async (sats: number, address: string): Promise<string> => {
  console.log('Sending offchain', sats, address)
  return await window.sendOffChain(false, [{ To: address, Amount: sats }])
}

export const sendOnchain = async (sats: number, address: string): Promise<string> => {
  console.log('Sending onchain', sats, address)
  return await window.sendOnChain([{ To: address, Amount: sats }])
}

export const waitPayment = async (initialBalance: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const id = setInterval(() => {
      getBalance().then((balance) => {
        if (balance !== initialBalance) {
          clearTimeout(id)
          resolve(true)
        }
      })
    }, 1000)
  })
}
