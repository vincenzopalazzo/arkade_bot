import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import SuccessIcon from '../../../icons/Success'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import { NotificationsContext } from '../../../providers/notifications'
import { IonContent } from '@ionic/react'
import Header from '../../../components/Header'

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
      <IonContent>
        <Header text='Sending' back={() => navigate(Pages.SendDetails)} />
        <div className='flex h-60 mt-4'>
          <div className='m-auto'>
            <SuccessIcon />
          </div>
        </div>
      </IonContent>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </>
  )
}
