import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import SuccessIcon from '../../../icons/Success'
import Title from '../../../components/Title'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import Padded from '../../../components/Padded'
import Content from '../../../components/Content'
import { NotificationsContext } from '../../../providers/notifications'
import { FlowContext } from '../../../providers/flow'
import { prettyNumber } from '../../../lib/format'

export default function NoteSuccess() {
  const { noteInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyPaymentReceived } = useContext(NotificationsContext)

  const goBackToWallet = () => navigate(Pages.Wallet)

  useEffect(() => {
    notifyPaymentReceived(noteInfo.satoshis)
  }, [])

  return (
    <Content>
      <Padded>
        <Title text='Success' subtext={`${prettyNumber(noteInfo.satoshis)} sats redeemed`} />
        <div className='flex h-60'>
          <div className='m-auto'>
            <SuccessIcon />
          </div>
        </div>
      </Padded>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Content>
  )
}
