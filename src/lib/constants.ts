export const arknoteHRP = 'arknote'
export const defaultFee = 0
export const testDomain = 'dev.arkade.money'

export const defaultArkServer = () => {
  return window.location.hostname === testDomain ? 'https://master.mutinynet.arklabs.to' : 'https://mutinynet.arkade.sh'
}

export const getFaucetUrl = (arkServerUrl: string): string => {
  if (arkServerUrl.match(/localhost/)) return 'http://localhost:9999'
  if (arkServerUrl === testDomain) return 'https://faucet.mutinynet.arklabs.to'
  return 'https://faucet.mutinynet.arkade.sh'
}
