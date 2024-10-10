declare global {
  export interface Window {
    Go: any
    balance: (bool) => Promise<any>
    claim: () => Promise<any>
    dump: () => Promise<string>
    getTransactionHistory: () => Promise<any>
    init: (
      walletType: string,
      clientType: string,
      aspUrl: string,
      privateKey: string,
      password: string,
      chain: string,
    ) => Promise<void>
    listVtxos: () => Promise<any>
    lock: (password: string) => Promise<any>
    locked: () => Promise<bool>
    receive: () => Promise<any>
    sendAsync: (withExpiryCoinselect: boolean, recepients: any[]) => Promise<string>
    sendOffChain: (withExpiryCoinselect: boolean, recepients: any[]) => Promise<string>
    sendOnChain: (recepients: any[]) => Promise<string>
    unlock: (password: string) => Promise<any>
  }
}
export {}
