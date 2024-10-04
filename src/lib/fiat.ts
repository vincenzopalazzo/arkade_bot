import { extractError } from './error'

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
    const { pricefeed }: OracleResponse = await fetch('https://btcoracle.bordalix.workers.dev/').then((res) =>
      res.json(),
    )
    return pricefeed
  } catch (err) {
    console.log('error fetching fiat prices:', extractError(err))
  }
}
