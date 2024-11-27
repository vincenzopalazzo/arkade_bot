import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import Content from '../../../components/Content'
import { NotificationsContext } from '../../../providers/notifications'
import { FlowContext } from '../../../providers/flow'
import { prettyNumber } from '../../../lib/format'
import Header from '../../../components/Header'
import Success from '../../../components/Success'

export default function NotesSuccess() {
  const { noteInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyPaymentReceived } = useContext(NotificationsContext)

  const goBackToWallet = () => navigate(Pages.Wallet)

  useEffect(() => {
    notifyPaymentReceived(noteInfo.satoshis)
  }, [])

  return (
    <>
      <Header text='Success' />
      <Content>
        <Success text={`${prettyNumber(noteInfo.satoshis)} sats redeemed`} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' />
      </ButtonsOnBottom>
    </>
  )
}
