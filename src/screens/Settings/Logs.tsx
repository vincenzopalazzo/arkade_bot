import Header from './Header'
import Table from '../../components/Table'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { useEffect, useState } from 'react'
import { prettyAgo, prettyLongText } from '../../lib/format'

type DataLine = [string, string]

type LogLine = {
  msg: string
  time: string
  level: string
}

export default function Logs() {
  const [data, setData] = useState<DataLine[]>([])
  const [load, setLoad] = useState(true)

  useEffect(() => {
    if (!load) return
    const data: DataLine[] = []
    const logs = localStorage.getItem('logs')
    const json = JSON.parse(logs ?? '[]') as LogLine[]
    for (const item of json) {
      if (item.time && item.msg) {
        const time = prettyAgo(item.time)
        const mesg = prettyLongText(item.msg.replaceAll('...', ''))
        data.push([time, mesg])
      }
    }
    setData(data)
    setLoad(false)
  }, [load])

  const clear = () => {
    localStorage.removeItem('logs')
    setLoad(true)
  }

  return (
    <>
      <Header text='Logs' back clear={clear} />
      <Content>
        <Padded>{data.length > 0 ? <Table data={data} /> : <p>No logs</p>}</Padded>
      </Content>
    </>
  )
}
