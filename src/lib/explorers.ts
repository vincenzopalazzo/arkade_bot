import { Wallet } from '../providers/wallet'
import { NetworkName } from './network'

export enum ExplorerName {
  Blockstream = 'Blockstream',
  Mempool = 'Mempool',
  Mutiny = 'Mutiny',
  Nigiri = 'Nigiri',
}

export interface ExplorerURLs {
  restApiExplorerURL: string
  webExplorerURL: string
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
      restApiExplorerURL: 'https://blockstream.info/liquid/api',
      webExplorerURL: 'https://blockstream.info/liquid',
    },
    [NetworkName.Testnet]: {
      restApiExplorerURL: 'https://blockstream.info/liquidtestnet/api',
      webExplorerURL: 'https://blockstream.info/liquidtestnet',
    },
  },
  {
    name: ExplorerName.Mempool,
    [NetworkName.Liquid]: {
      restApiExplorerURL: 'https://liquid.network/api',
      webExplorerURL: 'https://liquid.network',
    },
    [NetworkName.Testnet]: {
      restApiExplorerURL: 'https://liquid.network/liquidtestnet/api',
      webExplorerURL: 'https://liquid.network/liquidtestnet',
    },
  },
  {
    name: ExplorerName.Nigiri,
    [NetworkName.Regtest]: {
      restApiExplorerURL: 'http://localhost:3000',
      webExplorerURL: 'http://localhost:5000',
    },
  },
  {
    name: ExplorerName.Mutiny,
    [NetworkName.Signet]: {
      restApiExplorerURL: 'https://mutinynet.com/api',
      webExplorerURL: 'https://mutinynet.com',
    },
  },
]

export const getDefaultExplorer = (network: NetworkName) => getExplorerNames(network)[0]

export const getExplorerNames = (network: NetworkName) =>
  explorers.filter((e: Explorer) => e[network]).map((e) => e.name)

export const getRestApiExplorerURL = ({ explorer, network }: Wallet) => {
  const exp = explorers.find((e) => e.name === explorer)
  if (exp?.[network]) return exp[network]?.restApiExplorerURL
}

export const getWebExplorerURL = ({ explorer, network }: Wallet) => {
  const exp = explorers.find((e) => e.name === explorer)
  if (exp?.[network]) return exp[network]?.webExplorerURL
}

export const getTxIdURL = (txid: string, wallet: Wallet) => {
  // stupid bug from mempool
  const url = getWebExplorerURL(wallet)?.replace(
    'https://liquid.network/liquidtestnet',
    'https://liquid.network/testnet',
  )
  return `${url}/tx/${txid}`
}

export const openInNewTab = (txid: string, wallet: Wallet) => {
  window.open(getTxIdURL(txid, wallet), '_blank', 'noreferrer')
}
