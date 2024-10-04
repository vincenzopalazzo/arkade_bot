import { ReactNode, createContext, useState } from 'react'

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

interface FlowContextProps {
  initInfo: InitInfo
  recvInfo: RecvInfo
  sendInfo: SendInfo
  setInitInfo: (arg0: InitInfo) => void
  setRecvInfo: (arg0: RecvInfo) => void
  setSendInfo: (arg0: SendInfo) => void
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
  setInitInfo: () => {},
  setRecvInfo: () => {},
  setSendInfo: () => {},
})

export const FlowProvider = ({ children }: { children: ReactNode }) => {
  const [initInfo, setInitInfo] = useState(emptyInitInfo)
  const [recvInfo, setRecvInfo] = useState(emptyRecvInfo)
  const [sendInfo, setSendInfo] = useState(emptySendInfo)

  return (
    <FlowContext.Provider value={{ initInfo, recvInfo, sendInfo, setInitInfo, setRecvInfo, setSendInfo }}>
      {children}
    </FlowContext.Provider>
  )
}
