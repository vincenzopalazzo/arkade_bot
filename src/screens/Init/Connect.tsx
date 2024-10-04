import { useContext, useEffect } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { NavigationContext, Pages } from '../../providers/navigation'
import Content from '../../components/Content'
import { FlowContext } from '../../providers/flow'
import Container from '../../components/Container'
import { WalletContext } from '../../providers/wallet'

export default function InitConnect() {
  const { navigate } = useContext(NavigationContext)
  const { initInfo } = useContext(FlowContext)
  const { initWallet } = useContext(WalletContext)

  const { password, privateKey } = initInfo

  useEffect(() => {
    if (!password || !privateKey) return
    initWallet(password, privateKey).then(() => navigate(Pages.Unlock))
  }, [])

  const handleCancel = () => navigate(Pages.Init)

  return (
    <Container>
      <Content>
        <Title text='Initializing' subtext='Connecting wallet to ASP' />
        <p>This can take a few seconds.</p>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
