import { Wallet } from '../providers/wallet'
import { NetworkName } from './network'

export enum ExplorerName {
  Blockstream = 'Blockstream',
  Mempool = 'Mempool',
  Nigiri = 'Nigiri',
}

export interface ExplorerURLs {
  restApiExplorerURL: string
}

export interface Explorer {
  name: ExplorerName
  [NetworkName.Liquid]?: ExplorerURLs
  [NetworkName.Regtest]?: ExplorerURLs
  [NetworkName.Signet]?: ExplorerURLs
  [NetworkName.Testnet]?: ExplorerURLs
}

const explorers: Explorer[] = [
  {
    name: ExplorerName.Blockstream,
    [NetworkName.Liquid]: {
      restApiExplorerURL: 'https://blockstream.info/liquid',
    },
    [NetworkName.Testnet]: {
      restApiExplorerURL: 'https://blockstream.info/liquidtestnet',
    },
  },
  {
    name: ExplorerName.Mempool,
    [NetworkName.Liquid]: {
      restApiExplorerURL: 'https://liquid.network',
    },
    [NetworkName.Testnet]: {
      restApiExplorerURL: 'https://liquid.network/liquidtestnet',
    },
  },
  {
    name: ExplorerName.Nigiri,
    [NetworkName.Regtest]: {
      restApiExplorerURL: 'http://localhost:5001',
    },
  },
]

export const getExplorerNames = (network: NetworkName) =>
  explorers.filter((e: Explorer) => e[network]).map((e) => e.name)

const getRestApiExplorerURL = ({ explorer, network }: Wallet) => {
  const exp = explorers.find((e) => e.name === explorer)
  if (exp?.[network]) return exp[network]?.restApiExplorerURL
}

export const getTxIdURL = (txid: string, wallet: Wallet) => {
  // stupid bug from mempool
  const url = getRestApiExplorerURL(wallet)?.replace(
    'https://liquid.network/liquidtestnet',
    'https://liquid.network/testnet',
  )
  return `${url}/tx/${txid}`
}

export const openInNewTab = (txid: string, wallet: Wallet) => {
  window.open(getTxIdURL(txid, wallet), '_blank', 'noreferrer')
}

export const broadcastTxHex = async (txHex: string, wallet: Wallet): Promise<{ id: string }> => {
  const t = wallet.network === NetworkName.Testnet ? 'testnet.' : ''
  const url = `https://api.${t}boltz.exchange/v2/chain/L-BTC/transaction`
  const response = await fetch(url, {
    body: JSON.stringify({ hex: txHex }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  return await response.json()
}
