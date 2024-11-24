import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { ConfigContext, Themes } from '../../providers/config'
import Padded from '../../components/Padded'
import Textarea from '../../components/Textarea'
import Content from '../../components/Content'
import { copyToClipboard } from '../../lib/clipboard'
import { invalidNpub } from '../../lib/privateKey'
import Select from '../../components/Select'
import Error from '../../components/Error'
import { setNostrNotificationRecipient } from '../../lib/asp'
import Header from './Header'
import Toggle from '../../components/Toggle'
import { TextLabel, TextSecondary } from '../../components/Text'
import FlexCol from '../../components/FlexCol'
import InputAddress from '../../components/InputAddress'
import InputNpub from '../../components/InputNpub'

export default function Nostr() {
  const { config, updateConfig } = useContext(ConfigContext)

  const label = 'Copy to clipboard'

  const [buttonLabel, setButtonLabel] = useState(label)
  const [error, setError] = useState('')
  const [npub, setNpub] = useState('')

  useEffect(() => {
    if (config.npub) setNpub(config.npub)
  }, [])

  useEffect(() => {
    setError(invalidNpub(npub))
  }, [npub])

  const handleCheck = () => {
    updateConfig({ ...config, nostr: !config.nostr })
  }

  const handleCopy = async () => {
    await copyToClipboard(npub)
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(label), 2100)
  }

  const handleSave = () => {
    updateConfig({ ...config, npub })
    setNostrNotificationRecipient(npub)
  }

  const showCopyButton = config.nostr && config.npub === npub && npub
  const showSaveButton = config.nostr && config.npub !== npub && !error

  return (
    <>
      <Header text='Nostr' back />
      <Content>
        <TextLabel>Nostr</TextLabel>
        <Toggle checked={config.nostr} onClick={handleCheck} text='Allow Nostr' />
        <Padded>
          <FlexCol gap='3rem'>
            <TextSecondary wrap>
              If you let your VTXOs expire, you will receive, on Nostr, via encrypted DM, an arknote with the same
              value, that you will be able to redeem later.
            </TextSecondary>
            {config.nostr ? (
              <FlexCol>
                <InputNpub label='Nostr public key (npub)' onChange={setNpub} value={npub} />
                <Error error={Boolean(error)} text={error} />
              </FlexCol>
            ) : null}
          </FlexCol>
        </Padded>
      </Content>
      {config.nostr ? (
        <ButtonsOnBottom>
          {showCopyButton ? <Button onClick={handleCopy} label={buttonLabel} /> : null}
          {showSaveButton ? <Button onClick={handleSave} label='Save new npub' /> : null}
        </ButtonsOnBottom>
      ) : null}
    </>
  )
}
