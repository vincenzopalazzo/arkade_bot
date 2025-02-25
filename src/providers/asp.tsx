import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { AspInfo, emptyAspInfo, getAspInfo } from '../lib/asp'
import { ConfigContext } from './config'
import { prettyDate, prettyDelta } from '../lib/format'

interface AspContextProps {
  aspInfo: AspInfo
  marketHour: { start: string; lasts: string }
  setAspInfo: (info: AspInfo) => void
}

export const AspContext = createContext<AspContextProps>({
  aspInfo: emptyAspInfo,
  marketHour: { start: '', lasts: '' },
  setAspInfo: () => {},
})

export const AspProvider = ({ children }: { children: ReactNode }) => {
  const { config, configLoaded } = useContext(ConfigContext)

  const [aspInfo, setAspInfo] = useState(emptyAspInfo)

  useEffect(() => {
    if (!config.aspUrl || !configLoaded) return
    getAspInfo(config.aspUrl).then(setAspInfo)
  }, [config.aspUrl, configLoaded])

  const marketHour = {
    start: prettyDate(aspInfo.marketHour.nextStartTime),
    lasts: prettyDelta(aspInfo.marketHour.nextEndTime - aspInfo.marketHour.nextStartTime),
  }

  return <AspContext.Provider value={{ aspInfo, marketHour, setAspInfo }}>{children}</AspContext.Provider>
}
