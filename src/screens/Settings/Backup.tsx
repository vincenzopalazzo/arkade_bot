import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { ConfigContext } from '../../providers/config'
import Content from '../../components/Content'
import Textarea from '../../components/Textarea'
import Container from '../../components/Container'
import { copyToClipboard } from '../../lib/clipboard'
import { getPrivateKey } from '../../lib/asp'

export default function Backup() {
  const { toggleShowConfig } = useContext(ConfigContext)

  const label = 'Copy to clipboard'

  const [buttonLabel, setButtonLabel] = useState(label)
  const [privateKey, setPrivateKey] = useState('')

  useEffect(() => {
    getPrivateKey().then(setPrivateKey)
  }, [])

  const handleClose = () => {
    toggleShowConfig()
  }

  const handleCopy = async () => {
    await copyToClipboard(privateKey)
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(label), 2000)
  }

  return (
    <Container>
      <Content>
        <Title text='Backup' subtext='Save your data' />
        <Textarea label='Private key' value={privateKey} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleCopy} label={buttonLabel} />
        <Button onClick={handleClose} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
