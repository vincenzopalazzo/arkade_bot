import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Error from '../../components/Error'
import { NavigationContext, Pages } from '../../providers/navigation'
import Content from '../../components/Content'
import { FlowContext } from '../../providers/flow'
import Container from '../../components/Container'
import { invalidPrivateKey, nsecToPrivateKey } from '../../lib/privateKey'
import Textarea from '../../components/Textarea'

enum ButtonLabel {
  Invalid = 'Invalid private key',
  Ok = 'Continue',
}

export default function InitOld() {
  const { navigate } = useContext(NavigationContext)
  const { setInitInfo } = useContext(FlowContext)

  const [error, setError] = useState('')
  const [label, setLabel] = useState(ButtonLabel.Ok)
  const [privateKey, setPrivateKey] = useState('')
  const [someKey, setSomeKey] = useState('')

  useEffect(() => {
    const err = invalidPrivateKey(privateKey)
    setLabel(err ? ButtonLabel.Invalid : ButtonLabel.Ok)
    setError(err)
  }, [privateKey])

  useEffect(() => {
    setPrivateKey(someKey.match(/^nsec/) ? nsecToPrivateKey(someKey) : someKey)
  }, [someKey])

  const handleChange = (e: any) => setSomeKey(e.target.value)

  const handleCancel = () => navigate(Pages.Init)

  const handleProceed = () => {
    setInitInfo({ privateKey })
    navigate(Pages.InitPassword)
  }

  const disabled = privateKey.length > 0 && error.length > 0

  return (
    <Container>
      <Content>
        <Title text='Restore wallet' subtext='Insert your private key' />
        <div className='flex flex-col gap-2'>
          <Textarea label='Private key' onChange={handleChange} />
          <Error error={Boolean(error)} text={error} />
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleProceed} label={label} disabled={disabled} />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
