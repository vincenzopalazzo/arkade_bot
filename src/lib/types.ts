import { NetworkName } from './network'

export type Mnemonic = string
export type Password = string
export type Satoshis = number

export type Tx = {
  amount: number
  boardingTxid: string
  createdAt: number
  isPending: boolean
  redeemTxid: string
  roundTxid: string
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
  dateCreated: number
  dateSpent: number
  expireAt: number
  outpoint: {
    txid: string
    vout: 0
  }
  poolTxid: string
  receiver: {
    address: string
    amount: number
  }
  spent: boolean
  spentBy: string
  swept: boolean
}
