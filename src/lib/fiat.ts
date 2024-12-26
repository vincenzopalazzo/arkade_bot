import { consoleError } from './logs'

export interface FiatPrices {
  eur: number
  usd: number
}

export interface OracleResponse {
  pricefeed: FiatPrices
  timestamp: number
  publickey: string
  signature: string
}

export const getPriceFeed = async (): Promise<FiatPrices | undefined> => {
  try {
    const resp = await fetch('https://blockchain.info/ticker')
    const json = await resp.json()
    return {
      eur: json.EUR?.last,
      usd: json.USD?.last,
    }
  } catch (err) {
    consoleError('error fetching fiat prices', err)
  }
}
