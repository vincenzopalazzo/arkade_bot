import { useContext, useEffect } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { NavigationContext, Pages } from '../../providers/navigation'
import Padded from '../../components/Padded'
import { FlowContext } from '../../providers/flow'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'
import Loading from '../../components/Loading'

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
    <Content>
      <Padded>
        <Title text='Initializing' subtext='Connecting wallet to ASP' />
        <Loading />
      </Padded>
      <ButtonsOnBottom>
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Content>
  )
}
