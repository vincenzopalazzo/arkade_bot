export const arknoteHRP = 'arknote'
export const defaultFee = 0
export const defaultArkServer = () => {
  return window.location.hostname === 'dev.arkade.money'
    ? 'https://master.mutinynet.arklabs.to'
    : 'https://mutinynet.arkade.sh'
}
