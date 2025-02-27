import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { AspInfo, emptyAspInfo, getAspInfo } from '../lib/asp'
import { ConfigContext } from './config'
import { prettyDate, prettyDelta } from '../lib/format'

interface AspContextProps {
  aspInfo: AspInfo
  bestMarketHour: (nextRollOver: number) => number
  nextMarketHour: { start: string; lasts: string }
  setAspInfo: (info: AspInfo) => void
}

interface MarketHour {
  start: string
  lasts: string
}

export const AspContext = createContext<AspContextProps>({
  aspInfo: emptyAspInfo,
  bestMarketHour: () => 0,
  nextMarketHour: { start: '', lasts: '' } as MarketHour,
  setAspInfo: () => {},
})

export const AspProvider = ({ children }: { children: ReactNode }) => {
  const { config, configLoaded } = useContext(ConfigContext)

  const [aspInfo, setAspInfo] = useState(emptyAspInfo)

  useEffect(() => {
    if (!config.aspUrl || !configLoaded) return
    getAspInfo(config.aspUrl).then(setAspInfo)
  }, [config.aspUrl, configLoaded])

  const nextMarketHour = {
    start: prettyDate(aspInfo.marketHour.nextStartTime),
    lasts: prettyDelta(aspInfo.marketHour.nextEndTime - aspInfo.marketHour.nextStartTime),
  }

  const bestMarketHour = (nextRollOver: number) => {
    let startTime = aspInfo.marketHour.nextStartTime
    const period = aspInfo.marketHour.period
    while (startTime + period < nextRollOver) {
      startTime += period
    }
    return startTime
  }

  return (
    <AspContext.Provider value={{ aspInfo, bestMarketHour, nextMarketHour, setAspInfo }}>
      {children}
    </AspContext.Provider>
  )
}
