import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import Content from '../../../components/Content'
import { NotificationsContext } from '../../../providers/notifications'
import { FlowContext } from '../../../providers/flow'
import Header from '../../../components/Header'
import Success from '../../../components/Success'
import { WalletContext } from '../../../providers/wallet'

export default function ReceiveSuccess() {
  const { recvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyPaymentReceived } = useContext(NotificationsContext)
  const { reloadWallet } = useContext(WalletContext)

  const goBackToWallet = () => {
    reloadWallet()
    navigate(Pages.Wallet)
  }

  useEffect(() => {
    notifyPaymentReceived(recvInfo.satoshis)
  }, [])

  return (
    <>
      <Header text='Received' />
      <Content>
        <Success text={`Received ${recvInfo.satoshis} sats`} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </>
  )
}
