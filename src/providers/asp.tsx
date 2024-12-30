import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { AspInfo, emptyAspInfo, getAspInfo } from '../lib/asp'
import { ConfigContext } from './config'

interface AspContextProps {
  aspInfo: AspInfo
  setAspInfo: (info: AspInfo) => void
}

export const AspContext = createContext<AspContextProps>({
  aspInfo: emptyAspInfo,
  setAspInfo: () => {},
})

export const AspProvider = ({ children }: { children: ReactNode }) => {
  const { config } = useContext(ConfigContext)

  const [aspInfo, setAspInfo] = useState(emptyAspInfo)

  useEffect(() => {
    if (!config.aspUrl) return
    getAspInfo(config.aspUrl).then(setAspInfo)
  }, [config.aspUrl])

  return <AspContext.Provider value={{ aspInfo, setAspInfo }}>{children}</AspContext.Provider>
}
