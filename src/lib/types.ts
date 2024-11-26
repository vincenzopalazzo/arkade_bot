import { NetworkName } from './network'

export type Mnemonic = string
export type Password = string
export type Satoshis = number

export type Tx = {
  amount: number
  boardingTxid: string
  createdAt: number
  explorable: string | undefined
  pending: boolean
  redeemTxid: string
  roundTxid: string
  settled: boolean
  type: string
}

export type Transaction = {
  amount: number
  date: string
  hex?: string
  txid: string
  refresh?: number
  sweep?: boolean
  unixdate: number
}
export type Transactions = Record<NetworkName, Transaction[]>

export type Vtxo = {
  amount: number
  descriptor: string
  expireAt: number
  pending: boolean
  roundTxid: string
  redeemTx: string
  spent: boolean
  spentBy: string
  txid: string
  vout: number
}
