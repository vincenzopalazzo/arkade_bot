import { useContext, useEffect } from 'react'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { FlowContext } from '../../../providers/flow'
import { NotificationsContext } from '../../../providers/notifications'
import Header from '../../../components/Header'
import Content from '../../../components/Content'
import Success from '../../../components/Success'
import BackToWalletButton from '../../../components/BackToWalletButton'
import { prettyNumber } from '../../../lib/format'

export default function SendSuccess() {
  const { sendInfo } = useContext(FlowContext)
  const { notifyPaymentSent } = useContext(NotificationsContext)

  useEffect(() => {
    if (sendInfo.total) notifyPaymentSent(sendInfo.total)
  }, [sendInfo.total])

  return (
    <>
      <Header text='Success' />
      <Content>
        <Success text={`Sent ${prettyNumber(sendInfo.total)} sats`} />
      </Content>
      <ButtonsOnBottom>
        <BackToWalletButton />
      </ButtonsOnBottom>
    </>
  )
}
