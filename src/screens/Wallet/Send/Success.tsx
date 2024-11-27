import { useContext, useEffect } from 'react'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { FlowContext } from '../../../providers/flow'
import { NotificationsContext } from '../../../providers/notifications'
import Header from '../../../components/Header'
import Content from '../../../components/Content'
import Success from '../../../components/Success'
import BackToWalletButton from '../../../components/BackToWalletButton'

export default function SendSuccess() {
  const { sendInfo } = useContext(FlowContext)
  const { notifyPaymentSent } = useContext(NotificationsContext)

  useEffect(() => {
    if (sendInfo.satoshis) notifyPaymentSent(sendInfo.satoshis)
  }, [sendInfo.satoshis])

  return (
    <>
      <Header text='Sending' />
      <Content>
        <Success text={`Sent ${sendInfo.satoshis} sats`} />
      </Content>
      <ButtonsOnBottom>
        <BackToWalletButton />
      </ButtonsOnBottom>
    </>
  )
}
