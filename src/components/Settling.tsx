import { useEffect, useRef, useState } from 'react'
import Loading from './Loading'
import { getLogLineMsg, getLogsLength } from '../lib/logs'
import { sleep } from '../lib/sleep'

export default function Settling({ settle }: { settle?: boolean }) {
  const initialMessage =
    (settle ? 'Settling transactions' : 'Rolling over your VTXOs') + ' requires a round, which can take a few seconds'

  const [logLength, setLogLength] = useState(getLogsLength())
  const [logMessage, setLogMessage] = useState(initialMessage)

  const firstRun = useRef(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    // give 2 seconds to read initial message
    sleep(2000).then(() => {
      interval = setInterval(() => {
        setLogLength(getLogsLength())
      }, 500)
    })
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    setLogMessage(getLogLineMsg(logLength - 1))
  }, [logLength])

  return <Loading text={logMessage} />
}
