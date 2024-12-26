import Header from './Header'
import Text from '../../components/Text'
import Content from '../../components/Content'
import { useEffect, useState } from 'react'
import { prettyAgo, prettyLongText } from '../../lib/format'
import { clearLogs, getLogs, LogLine } from '../../lib/logs'
import FlexCol from '../../components/FlexCol'
import FlexRow from '../../components/FlexRow'

function LogsTable({ logs }: { logs: LogLine[] }) {
  const color = (level: string): string => {
    if (level === 'info') return ''
    if (level === 'warn') return 'yellow'
    if (level === 'error') return 'red'
    return ''
  }

  if (logs.length === 0) return <p>No logs</p>

  return (
    <div style={{ margin: '1rem' }}>
      <FlexCol gap='0.5rem'>
        {logs.reverse().map(({ time, msg, level }) => (
          <FlexRow between key={`${time}${msg}`}>
            <Text color={color(level)}>{prettyAgo(time)}</Text>
            <Text color='dark50'>{prettyLongText(msg.replace('...', ''))}</Text>
          </FlexRow>
        ))}
      </FlexCol>
    </div>
  )
}

export default function Logs() {
  const [logs, setLogs] = useState<LogLine[]>([])
  const [load, setLoad] = useState(true)

  useEffect(() => {
    if (!load) return
    setLogs(getLogs())
    setLoad(false)
  }, [load])

  const clear = () => {
    clearLogs() // clear logs from local storage
    setLoad(true) // to reload page and show empty logs
  }

  return (
    <>
      <Header text='Logs' back clear={clear} />
      <Content>
        <LogsTable logs={logs} />
      </Content>
    </>
  )
}
