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
import Header from '../../../components/Header'
import CenterScreen from '../../../components/CenterScreen'
import Text from '../../../components/Text'
import FlexCol from '../../../components/FlexCol'

export default function NoteSuccess() {
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
        <CenterScreen>
          <FlexCol centered>
            <SuccessIcon />
            <Text>{`${prettyNumber(noteInfo.satoshis)} sats redeemeed`}</Text>
          </FlexCol>
        </CenterScreen>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' />
      </ButtonsOnBottom>
    </>
  )
}
