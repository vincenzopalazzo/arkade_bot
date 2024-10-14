import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import SuccessIcon from '../../../icons/Success'
import Title from '../../../components/Title'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import Content from '../../../components/Content'
import Container from '../../../components/Container'
import { FlowContext } from '../../../providers/flow'
import { NostrContext } from '../../../providers/nostr'

export default function SendSuccess() {
  const { sendInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { sendNotification } = useContext(NostrContext)

  const goBackToWallet = () => navigate(Pages.Wallet)

  useEffect(() => {
    sendNotification(`payment sent: ${sendInfo.satoshis} sats`)
  }, [])

  return (
    <Container>
      <Content>
        <Title text='Success' subtext='Payment sent' />
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
