import { prettyNumber } from '../lib/format'
import Table from './Table'

export interface DetailsProps {
  address?: string
  arknote?: string
  invoice?: string
  comment?: string
  fees?: number
  satoshis?: number
  total?: number
}

export default function Details({ details }: { details?: DetailsProps }) {
  if (!details) return <></>

  const { address, arknote, comment, fees, invoice, satoshis, total } = details

  const table = []

  if (arknote) table.push(['Arknote', arknote])
  if (invoice) table.push(['Invoice', invoice])
  if (address) table.push(['Address', address])
  if (comment) table.push(['Comment', comment])
  if (satoshis) table.push(['Amount', `${prettyNumber(satoshis)} sats`])
  if (fees) table.push(['Network fees', `${prettyNumber(fees)} sats`])
  if (total) table.push(['Total', `${prettyNumber(total)} sats`])

  return <Table data={table} />
}
