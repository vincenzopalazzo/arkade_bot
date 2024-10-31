declare global {
  export interface Window {
    Go: any
    balance: (bool) => Promise<any>
    collaborativeRedeem: (addr: string, amount: number, withExpiryCoinselect: boolean) => Promise<string>
    dump: () => Promise<string>
    getTransactionHistory: () => Promise<any>
    // getTransactionStream: (callback: any) => Promise<any>
    init: (
      walletType: string,
      clientType: string,
      aspUrl: string,
      privateKey: string,
      password: string,
      chain: string,
      explorer: string,
    ) => Promise<void>
    listVtxos: () => Promise<any>
    lock: (password: string) => Promise<any>
    locked: () => Promise<bool>
    receive: () => Promise<any>
    sendAsync: (withExpiryCoinselect: boolean, recepients: any[]) => Promise<string>
    sendOffChain: (withExpiryCoinselect: boolean, recepients: any[]) => Promise<string>
    sendOnChain: (recepients: any[]) => Promise<string>
    settle: () => Promise<any>
    unlock: (password: string) => Promise<any>
  }
}
export {}
