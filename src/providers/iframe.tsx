import { ReactNode, createContext, useState } from 'react'

interface IframeContextProps {
  iframeUrl: string
  setIframeUrl: (url: string) => void
}

export const IframeContext = createContext<IframeContextProps>({
  iframeUrl: '',
  setIframeUrl: () => {},
})

export const IframeProvider = ({ children }: { children: ReactNode }) => {
  const [iframeUrl, setIframeUrl] = useState('')

  return (
    <IframeContext.Provider
      value={{
        iframeUrl,
        setIframeUrl,
      }}
    >
      {children}
    </IframeContext.Provider>
  )
}
