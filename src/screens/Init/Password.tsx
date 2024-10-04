import { useContext, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { NavigationContext, Pages } from '../../providers/navigation'
import Content from '../../components/Content'
import NewPassword from '../../components/NewPassword'
import { FlowContext } from '../../providers/flow'
import Container from '../../components/Container'

export default function InitPassword() {
  const { navigate } = useContext(NavigationContext)
  const { initInfo, setInitInfo } = useContext(FlowContext)

  const [label, setLabel] = useState('')
  const [password, setPassword] = useState('')

  const handleCancel = () => navigate(Pages.Init)

  const handleProceed = async () => {
    setInitInfo({ ...initInfo, password })
    navigate(Pages.InitConnect)
  }

  return (
    <Container>
      <Content>
        <Title text='Password' subtext='Define your password' />
        <NewPassword onNewPassword={setPassword} setLabel={setLabel} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleProceed} label={label} disabled={!password} />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
