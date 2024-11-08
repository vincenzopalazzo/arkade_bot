import { ReactNode, createContext, useContext } from 'react'
import { ConfigContext } from './config'
import { sendNotification } from '../lib/notifications'
import { prettyNumber } from '../lib/format'

interface NotificationsContextProps {
  notifyPaymentReceived: (s: number) => void
  notifyPaymentSent: (s: number) => void
  notifyVtxosRecycled: () => void
  notifyTxSettled: () => void
}

export const NotificationsContext = createContext<NotificationsContextProps>({
  notifyPaymentReceived: () => {},
  notifyPaymentSent: () => {},
  notifyVtxosRecycled: () => {},
  notifyTxSettled: () => {},
})

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const { config } = useContext(ConfigContext)

  const sendSystemNotification = (title: string, body: string) => {
    if (!config.notifications) return
    sendNotification(title, body)
  }

  const notifyPaymentReceived = (sats: number) => {
    const body = `You received ${prettyNumber(sats)} sats`
    const title = 'Payment received'
    sendSystemNotification(title, body)
  }

  const notifyPaymentSent = (sats: number) => {
    const body = `You sent ${prettyNumber(sats)} sats`
    const title = 'Payment sent'
    sendSystemNotification(title, body)
  }

  const notifyTxSettled = () => {
    const body = `All pending transactions were settled`
    const title = 'Transactions settled'
    sendSystemNotification(title, body)
  }

  const notifyVtxosRecycled = () => {
    const body = 'All VTXOs were rolled over'
    const title = 'Vtxos rolled over'
    sendSystemNotification(title, body)
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifyPaymentReceived,
        notifyPaymentSent,
        notifyVtxosRecycled,
        notifyTxSettled,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}
