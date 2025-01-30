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
  const { config, configLoaded, updateConfig } = useContext(ConfigContext)

  const [aspInfo, setAspInfo] = useState(emptyAspInfo)

  const arkServer = {
    old: 'https://master.signet.arklabs.to',
    new: 'https://master.mutinynet.arklabs.to',
  }

  useEffect(() => {
    if (!config.aspUrl || !configLoaded) return
    // getAspInfo(config.aspUrl).then(setAspInfo) // TODO temp fix
    getAspInfo(config.aspUrl).then((info) => {
      if (info.unreachable && config.aspUrl == arkServer.old) {
        getAspInfo(arkServer.new).then((asp) => {
          if (!asp.unreachable) {
            localStorage.setItem('server_url', arkServer.new)
            updateConfig({ ...config, aspUrl: arkServer.new })
          }
        })
      } else setAspInfo(info)
    })
  }, [config.aspUrl, configLoaded])

  const marketHour = {
    start: prettyDate(aspInfo.marketHour.nextStartTime),
    lasts: prettyDelta(aspInfo.marketHour.nextEndTime - aspInfo.marketHour.nextStartTime),
  }

  return <AspContext.Provider value={{ aspInfo, marketHour, setAspInfo }}>{children}</AspContext.Provider>
}
