import { NetworkName } from '@arklabs/wallet-sdk/dist/types/networks'
import { Satoshis } from './types'
import * as bolt11 from './bolt11'

export const getBoltzApiUrl = (network: NetworkName): string => {
  switch (network) {
    case 'bitcoin':
      return 'https://api-boltz-bitcoin.arkade.sh'
    case 'regtest':
      return 'http://localhost:9006'
    default:
      return ''
  }
}

export const getBoltzLimits = async (network: NetworkName): Promise<{ min: number; max: number }> => {
  const url = getBoltzApiUrl(network)
  if (!url) throw 'Invalid network for Boltz API'
  const response = await fetch(`${getBoltzApiUrl(network)}/v2/swap/limits`)
  if (!response.ok) {
    const errorData = await response.json()
    throw errorData.error || 'Failed to fetch limits'
  }
  return (await response.json()) as {
    min: number
    max: number
  }
}

export const getInvoiceSatoshis = (invoice: string): number => {
  return bolt11.decode(invoice).satoshis ?? 0
}

const getPubKey = async (): Promise<string> => {
  return 'xxxx'
}

export const submarineSwap = async (
  invoice: string,
  network: NetworkName,
): Promise<{ address: string; amount: number }> => {
  const refundPublicKey = await getPubKey()
  if (!refundPublicKey) throw 'Failed to get public key'

  const response = await fetch(`${getBoltzApiUrl(network)}/v2/swap/submarine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ARK',
      to: 'BTC',
      invoice,
      refundPublicKey,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw errorData.error || 'Failed to process Lightning payment'
  }

  const res = (await response.json()) as {
    address: string
    expectedAmount: number
  }

  return { address: res.address, amount: res.expectedAmount }
}

export const reverseSwap = async (sats: Satoshis): Promise<string> => {
  return `lnbc1${sats}` // TODO not implemented yet
}
