import { useContext, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { NavigationContext, Pages } from '../../providers/navigation'
import Padded from '../../components/Padded'
import NewPassword from '../../components/NewPassword'
import { FlowContext } from '../../providers/flow'
import Content from '../../components/Content'

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
    <Content>
      <Padded>
        <Title text='Password' subtext='Define your password' />
        <NewPassword onNewPassword={setPassword} setLabel={setLabel} />
      </Padded>
      <ButtonsOnBottom>
        <Button onClick={handleProceed} label={label} disabled={!password} />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Content>
  )
}
