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
import { privateKeyToNsec } from '../../lib/privateKey'

export default function Backup() {
  const { toggleShowConfig } = useContext(ConfigContext)

  const label = 'Copy to clipboard'

  const [buttonLabel, setButtonLabel] = useState(label)
  const [nsec, setNsec] = useState('')

  useEffect(() => {
    getPrivateKey().then((sk) => setNsec(privateKeyToNsec(sk)))
  }, [])

  const handleClose = () => {
    toggleShowConfig()
  }

  const handleCopy = async () => {
    await copyToClipboard(nsec)
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(label), 2000)
  }

  return (
    <Container>
      <Content>
        <Title text='Backup' subtext='Save your data' />
        <Textarea label='Private key' value={nsec} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleCopy} label={buttonLabel} />
        <Button onClick={handleClose} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
