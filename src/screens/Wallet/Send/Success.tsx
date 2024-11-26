import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import { NotificationsContext } from '../../../providers/notifications'
import Header from '../../../components/Header'
import Content from '../../../components/Content'
import Success from '../../../components/Success'
import { WalletContext } from '../../../providers/wallet'

export default function SendSuccess() {
  const { sendInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyPaymentSent } = useContext(NotificationsContext)
  const { reloadWallet } = useContext(WalletContext)

  const goBackToWallet = () => {
    reloadWallet()
    navigate(Pages.Wallet)
  }

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
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </>
  )
}
