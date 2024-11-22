import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import SuccessIcon from '../../../icons/Success'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import { NotificationsContext } from '../../../providers/notifications'
import Header from '../../../components/Header'
import Content from '../../../components/Content'

export default function SendSuccess() {
  const { sendInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyPaymentSent } = useContext(NotificationsContext)

  const goBackToWallet = () => navigate(Pages.Wallet)

  useEffect(() => {
    if (sendInfo.satoshis) notifyPaymentSent(sendInfo.satoshis)
  }, [sendInfo.satoshis])

  return (
    <>
      <Header text='Sending' back={() => navigate(Pages.SendDetails)} />
      <Content>
        <div className='flex h-60 mt-4'>
          <div className='m-auto'>
            <SuccessIcon />
          </div>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </>
  )
}
