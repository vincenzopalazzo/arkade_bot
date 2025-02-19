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
import { TextSecondary } from '../../components/Text'
import FlexCol from '../../components/FlexCol'
import { copiedToClipboard } from '../../lib/toast'
import { useIonToast } from '@ionic/react'

export default function Backup() {
  const [nsec, setNsec] = useState('')
  const [present] = useIonToast()

  useEffect(() => {
    getPrivateKey().then((sk) => {
      setNsec(seedToNsec(sk))
    })
  }, [])

  const handleCopy = async () => {
    await copyToClipboard(nsec)
    present(copiedToClipboard)
  }

  return (
    <>
      <Header text='Backup' back />
      <Content>
        <Padded>
          <FlexCol>
            <Textarea label='Private key' value={nsec} />
          </FlexCol>
          <FlexCol gap='0.5rem' margin='2rem 0 0 0'>
            <TextSecondary>This is enough to restore your wallet.</TextSecondary>
          </FlexCol>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleCopy} label='Copy to clipboard' />
      </ButtonsOnBottom>
    </>
  )
}
