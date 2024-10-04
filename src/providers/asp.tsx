import { ReactNode, createContext, useState } from 'react'
import { AspInfo, emptyAspInfo } from '../lib/asp'

interface AspContextProps {
  aspInfo: AspInfo
  setAspInfo: (info: AspInfo) => void
}

export const AspContext = createContext<AspContextProps>({
  aspInfo: emptyAspInfo,
  setAspInfo: () => {},
})

export const AspProvider = ({ children }: { children: ReactNode }) => {
  const [aspInfo, setAspInfo] = useState(emptyAspInfo)

  return <AspContext.Provider value={{ aspInfo, setAspInfo }}>{children}</AspContext.Provider>
}
