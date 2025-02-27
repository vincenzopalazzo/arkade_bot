import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { AspInfo, emptyAspInfo, emptyMarketHour, getAspInfo, MarketHour } from '../lib/asp'
import { ConfigContext } from './config'
import { prettyAgo, prettyDate, prettyDelta } from '../lib/format'

interface AspContextProps {
  aspInfo: AspInfo
  bestMarketHour: (nextRollOver: number) => MarketHour
  nextMarketHour: MarketHour
  setAspInfo: (info: AspInfo) => void
}

export const AspContext = createContext<AspContextProps>({
  aspInfo: emptyAspInfo,
  bestMarketHour: () => emptyMarketHour,
  nextMarketHour: emptyMarketHour,
  setAspInfo: () => {},
})

export const AspProvider = ({ children }: { children: ReactNode }) => {
  const { config, configLoaded } = useContext(ConfigContext)

  const [aspInfo, setAspInfo] = useState(emptyAspInfo)

  useEffect(() => {
    if (!config.aspUrl || !configLoaded) return
    getAspInfo(config.aspUrl).then(setAspInfo)
  }, [config.aspUrl, configLoaded])

  const duration = aspInfo.marketHour.nextEndTime - aspInfo.marketHour.nextStartTime

  const nextMarketHour: MarketHour = {
    prettyDuration: prettyDelta(duration),
    prettyStart: prettyDate(aspInfo.marketHour.nextStartTime),
    prettyEnd: prettyDate(aspInfo.marketHour.nextEndTime),
    prettyIn: prettyAgo(aspInfo.marketHour.nextStartTime, true),
    startTime: aspInfo.marketHour.nextStartTime,
    endTime: aspInfo.marketHour.nextEndTime,
    period: aspInfo.marketHour.period,
  }

  const bestMarketHour = (nextRollOver: number): MarketHour => {
    let startTime = aspInfo.marketHour.nextStartTime
    const period = aspInfo.marketHour.period
    while (startTime + period < nextRollOver) {
      startTime += period
    }
    return {
      prettyDuration: prettyDelta(duration),
      prettyStart: prettyDate(startTime),
      prettyEnd: prettyDate(startTime + duration),
      prettyIn: prettyAgo(startTime, true),
      startTime,
      endTime: startTime + duration,
      period,
    }
  }

  return (
    <AspContext.Provider value={{ aspInfo, bestMarketHour, nextMarketHour, setAspInfo }}>
      {children}
    </AspContext.Provider>
  )
}
