import { Satoshis } from './types'
import { Decimal } from 'decimal.js'

export const prettyLongText = (invoice?: string, showChars = 14): string => {
  if (!invoice) return ''
  return `${invoice.substring(0, showChars)}...${invoice.substring(invoice.length - showChars, invoice.length)}`
}

export const prettyNumber = (num?: number, maximumFractionDigits = 8): string => {
  if (!num) return '0'
  return new Intl.NumberFormat('en', { style: 'decimal', maximumFractionDigits }).format(num)
}

export const prettyUnixTimestamp = (num: number): string => {
  if (!num) return ''
  const date = new Date(num * 1000)
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
}

export const prettyDate = (num: number): string => {
  if (!num) return ''
  const date = new Date(num * 1000)
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    minute: '2-digit',
    hour: '2-digit',
  }).format(date)
}

export const fromSatoshis = (num: Satoshis): number => {
  return Decimal.div(num, 100_000_000).toNumber()
}

export const toSatoshis = (num: number): Satoshis => {
  return Decimal.mul(num, 100_000_000).toNumber()
}

export const prettyDelta = (seconds: number): string => {
  const delta = Math.abs(seconds)
  if (delta > 86_400) {
    const days = Math.floor(delta / 86_400)
    return `${days}d`
  }
  if (delta > 3_600) {
    const hours = Math.floor(delta / 3_600)
    return `${hours}h`
  }
  if (delta > 60) {
    const minutes = Math.floor(delta / 60)
    return `${minutes}m`
  }
  if (delta > 0) {
    const seconds = delta
    return `${seconds}s`
  }
  return ''
}

export const prettyAgo = (timestamp: number | string): string => {
  const unixts = typeof timestamp === 'string' ? Math.floor(new Date(timestamp).getTime() / 1000) : timestamp
  const now = Math.floor(Date.now() / 1000)
  const delta = Math.floor(now - unixts)
  if (delta === 0) return 'just now'
  if (delta > 0) return `${prettyDelta(delta)} ago`
  if (delta < 0) return `in ${prettyDelta(delta)}`
  return ''
}
