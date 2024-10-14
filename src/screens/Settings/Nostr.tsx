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
import { seedToNpub } from '../../lib/privateKey'

export default function Nostr() {
  const { toggleShowConfig } = useContext(ConfigContext)

  const label = 'Copy to clipboard'

  const [buttonLabel, setButtonLabel] = useState(label)
  const [npub, setNpub] = useState('')

  useEffect(() => {
    getPrivateKey().then((sk) => {
      setNpub(seedToNpub(sk))
    })
  }, [])

  const handleClose = () => {
    toggleShowConfig()
  }

  const handleCopy = async () => {
    await copyToClipboard(npub)
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(label), 2100)
  }

  return (
    <Container>
      <Content>
        <Title text='Nostr' />
        <div className='flex flex-col gap-10'>
          <Textarea label='Public key' value={npub} />
          <p>Use this to get notifications on Nostr</p>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleCopy} label={buttonLabel} />
        <Button onClick={handleClose} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
