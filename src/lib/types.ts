import { NetworkName } from './network'

export type Mnemonic = string
export type Password = string
export type Satoshis = number

export type Addresses = {
  boardingAddr: string
  offchainAddr: string
}

export type Tx = {
  amount: number
  boardingTxid: string
  createdAt: number
  explorable: string | undefined
  pending: boolean
  redeemTxid: string
  roundTxid: string
  settled: boolean
  spentBy: string
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
  createdAt: string
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

export type Vtxos = {
  spendable: Vtxo[]
  spent: Vtxo[]
}
