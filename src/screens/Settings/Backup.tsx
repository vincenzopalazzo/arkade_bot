import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Padded from '../../components/Padded'
import Textarea from '../../components/Textarea'
import Content from '../../components/Content'
import { copyToClipboard } from '../../lib/clipboard'
import { getPrivateKey } from '../../lib/asp'
import { seedToNsec } from '../../lib/privateKey'
import Header from './Header'
import FlexCol from '../../components/flexCol'
import { TextNormal } from '../../components/Text'

export default function Backup() {
  const label = 'Copy to clipboard'

  const [buttonLabel, setButtonLabel] = useState(label)
  const [nsec, setNsec] = useState('')

  useEffect(() => {
    getPrivateKey().then((sk) => {
      setNsec(seedToNsec(sk))
    })
  }, [])

  const handleCopy = async () => {
    await copyToClipboard(nsec)
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(label), 2000)
  }

  return (
    <>
      <Header text='Backup' back />
      <Content>
        <Padded>
          <FlexCol>
            <Textarea label='Private key' value={nsec} />
            <TextNormal>This is enough to restore your wallet</TextNormal>
          </FlexCol>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleCopy} label={buttonLabel} />
      </ButtonsOnBottom>
    </>
  )
}
