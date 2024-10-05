import { ReactNode, createContext, useState } from 'react'
import { Tx } from '../lib/types'

export interface InitInfo {
  password?: string
  privateKey: string
}

export interface RecvInfo {
  boardingAddr: string
  offchainAddr: string
  satoshis: number
  txid?: string
}

export type SendInfo = {
  address?: string
  arkAddress?: string
  satoshis?: number
  txid?: string
}

export type TxInfo = Tx | undefined

interface FlowContextProps {
  initInfo: InitInfo
  recvInfo: RecvInfo
  sendInfo: SendInfo
  txInfo: TxInfo
  setInitInfo: (arg0: InitInfo) => void
  setRecvInfo: (arg0: RecvInfo) => void
  setSendInfo: (arg0: SendInfo) => void
  setTxInfo: (arg0: TxInfo) => void
}

export const emptyInitInfo: InitInfo = {
  password: '',
  privateKey: '',
}

export const emptyRecvInfo: RecvInfo = {
  boardingAddr: '',
  offchainAddr: '',
  satoshis: 0,
}

export const emptySendInfo: SendInfo = {
  address: '',
  arkAddress: '',
  satoshis: 0,
  txid: '',
}

export const FlowContext = createContext<FlowContextProps>({
  initInfo: emptyInitInfo,
  recvInfo: emptyRecvInfo,
  sendInfo: emptySendInfo,
  txInfo: undefined,
  setInitInfo: () => {},
  setRecvInfo: () => {},
  setSendInfo: () => {},
  setTxInfo: () => {},
})

export const FlowProvider = ({ children }: { children: ReactNode }) => {
  const [initInfo, setInitInfo] = useState(emptyInitInfo)
  const [recvInfo, setRecvInfo] = useState(emptyRecvInfo)
  const [sendInfo, setSendInfo] = useState(emptySendInfo)
  const [txInfo, setTxInfo] = useState<TxInfo>()

  return (
    <FlowContext.Provider
      value={{ initInfo, recvInfo, sendInfo, txInfo, setInitInfo, setRecvInfo, setSendInfo, setTxInfo }}
    >
      {children}
    </FlowContext.Provider>
  )
}
