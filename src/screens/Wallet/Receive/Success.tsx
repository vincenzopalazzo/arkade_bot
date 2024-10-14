import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import SuccessIcon from '../../../icons/Success'
import Title from '../../../components/Title'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import Content from '../../../components/Content'
import Container from '../../../components/Container'
import { NostrContext } from '../../../providers/nostr'
import { FlowContext } from '../../../providers/flow'

export default function ReceiveSuccess() {
  const { recvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { sendNotification } = useContext(NostrContext)

  const goBackToWallet = () => navigate(Pages.Wallet)

  useEffect(() => {
    sendNotification(`payment received: ${recvInfo.satoshis} sats`)
  }, [])

  return (
    <Container>
      <Content>
        <Title text='Success' subtext='Payment received' />
        <div className='flex h-60'>
          <div className='m-auto'>
            <SuccessIcon />
          </div>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
