import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import SuccessIcon from '../../../icons/Success'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import Padded from '../../../components/Padded'
import Content from '../../../components/Content'
import { NotificationsContext } from '../../../providers/notifications'
import { FlowContext } from '../../../providers/flow'
import Header from '../../../components/Header'

export default function ReceiveSuccess() {
  const { recvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyPaymentReceived } = useContext(NotificationsContext)

  const goBackToWallet = () => navigate(Pages.Wallet)

  useEffect(() => {
    notifyPaymentReceived(recvInfo.satoshis)
  }, [])

  return (
    <>
      <Header text='Received' />
      <Content>
        <Padded>
          <div className='flex h-60'>
            <div className='m-auto'>
              <SuccessIcon />
            </div>
          </div>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </>
  )
}
