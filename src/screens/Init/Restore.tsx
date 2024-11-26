import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Error from '../../components/Error'
import { NavigationContext, Pages } from '../../providers/navigation'
import Padded from '../../components/Padded'
import { FlowContext } from '../../providers/flow'
import Content from '../../components/Content'
import { invalidPrivateKey, nsecToSeed } from '../../lib/privateKey'
import Textarea from '../../components/Textarea'
import Header from '../../components/Header'
import FlexCol from '../../components/FlexCol'

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
    setPrivateKey(someKey.match(/^nsec/) ? nsecToSeed(someKey) : someKey)
  }, [someKey])

  const handleChange = (key: string) => {
    setSomeKey(key)
  }

  const handleCancel = () => navigate(Pages.Init)

  const handleProceed = () => {
    setInitInfo({ privateKey })
    navigate(Pages.InitPassword)
  }

  const disabled = privateKey.length > 0 && error.length > 0

  return (
    <>
      <Header text='Restore wallet' back={handleCancel} />
      <Content>
        <Padded>
          <FlexCol>
            <Textarea label='Private key' onChange={handleChange} />
            <Error error={Boolean(error)} text={error} />
          </FlexCol>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleProceed} label={label} disabled={disabled} />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </>
  )
}
