import { ReactNode, createContext, useContext, useEffect } from 'react'
import { WalletContext } from './wallet'

export const IframeContext = createContext({})

export const IframeProvider = ({ children }: { children: ReactNode }) => {
  const { walletUnlocked } = useContext(WalletContext)

  const sendMessage = (message: string) => window.parent.postMessage(message, '*')

  useEffect(() => {
    window.addEventListener('message', (event) => {
      console.log('Received message from parent:', event.data)
      if (event.data === 'status') {
        sendMessage(walletUnlocked ? 'ready' : 'locked')
      }
    })
  }, [])

  return <IframeContext.Provider value={{}}>{children}</IframeContext.Provider>
}
