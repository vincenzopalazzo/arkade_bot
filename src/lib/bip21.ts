// https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
// bitcoin:<address>[?amount=<amount>][?label=<label>][?message=<message>]

import qs from 'qs'
import { fromSatoshis, toSatoshis } from './format'

export const decode = (uri: string) => {
  if (!isBip21(uri)) throw new Error('Invalid BIP21 URI: ' + uri)
  let amount, destination, options, query
  const [scheme, rest] = uri.split(':')
  if (rest.indexOf('?') !== -1) {
    const split = uri.split('?')
    destination = split[0]
    query = split[1]
  } else {
    destination = rest
  }
  if (query) options = qs.parse(query)
  if (options?.amount) {
    amount = toSatoshis(Number(options.amount))
    if (!isFinite(amount)) throw new Error('Invalid amount')
    if (amount < 0) throw new Error('Invalid amount')
  }
  const arkAddress = scheme === 'ark' ? destination : (options?.ark as string)
  const invoice = /^lightning/.test(scheme) ? destination : (options?.lightning as string)
  const address = /^bitcoin/.test(scheme) ? destination : (options?.liquidnetwork as string)

  return { address, amount, arkAddress, destination, invoice, options, scheme }
}

export const encode = (address: string, arkAddress: string, satoshis: number) => {
  return `bitcoin:${address}` + `?ark=${arkAddress}` + `&amount=${fromSatoshis(satoshis)}`
}

export const isBip21 = (data: string): boolean => {
  return /^\w+:.+/.test(data) // TODO
}
