import { ReactNode, createContext, useEffect, useRef } from 'react'
import { hexToBytes } from '@noble/hashes/utils'
import { finalizeEvent, getPublicKey, Relay } from 'nostr-tools'
import { getPrivateKey } from '../lib/asp'

interface NostrContextProps {
  sendNotification: (content: string) => void
}

export const NostrContext = createContext<NostrContextProps>({
  sendNotification: () => {},
})

export const NostrProvider = ({ children }: { children: ReactNode }) => {
  const relay = useRef<Relay>()

  const connectRelay = async (): Promise<void> => {
    relay.current = await Relay.connect('wss://relay.primal.net')
  }

  const sendNotification = async (content: string) => {
    if (!relay.current) return
    if (!relay.current.connected) await connectRelay()
    const seed = await getPrivateKey()
    const sk = hexToBytes(seed)
    const pk = getPublicKey(sk)
    relay.current.subscribe(
      [
        {
          kinds: [1],
          authors: [pk],
        },
      ],
      {
        onevent(event) {
          console.log('got event:', event)
        },
      },
    )
    const eventTemplate = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content,
    }
    const signedEvent = finalizeEvent(eventTemplate, sk)
    await relay.current.publish(signedEvent)
  }

  useEffect(() => {
    connectRelay()
  }, [])

  return <NostrContext.Provider value={{ sendNotification }}>{children}</NostrContext.Provider>
}
