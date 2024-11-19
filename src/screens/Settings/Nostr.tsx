import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { ConfigContext } from '../../providers/config'
import Content from '../../components/Content'
import Textarea from '../../components/Textarea'
import Container from '../../components/Container'
import { copyToClipboard } from '../../lib/clipboard'
import { invalidNpub } from '../../lib/privateKey'
import Select from '../../components/Select'
import Error from '../../components/Error'
import { setNostrNotificationRecipient } from '../../lib/asp'
import Header from './Header'

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

  const handleAuth = (e: any) => {
    updateConfig({ ...config, nostr: Boolean(parseInt(e.target.value)) })
  }

  const handleChange = (e: any) => {
    setNpub(e.target.value)
  }

  const handleSave = () => {
    updateConfig({ ...config, npub })
    setNostrNotificationRecipient(npub)
  }

  const handleCopy = async () => {
    await copyToClipboard(npub)
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(label), 2100)
  }

  const value = config.nostr ? '1' : '0'
  const showCopyButton = config.nostr && config.npub === npub && npub
  const showSaveButton = config.nostr && config.npub !== npub && !error

  return (
    <Container>
      <Content>
        <Header text='Nostr' back />
        <div className='flex flex-col gap-10 mt-10'>
          <p>
            If you let your VTXOs expire, you will receive, on Nostr, via encrypted DM, an arknote with the same value,
            that you will be able to redeem later.
          </p>
          <Select onChange={handleAuth} value={value}>
            <option value='0'>Not allowed</option>
            <option value='1'>Allowed</option>
          </Select>
          {config.nostr ? (
            <>
              <Textarea label='Nostr public key (npub)' value={npub} onChange={handleChange} />
              <Error error={Boolean(error)} text={error} />
            </>
          ) : null}
        </div>
      </Content>
      <ButtonsOnBottom>
        {showCopyButton ? <Button onClick={handleCopy} label={buttonLabel} /> : null}
        {showSaveButton ? <Button onClick={handleSave} label='Save new npub' /> : null}
      </ButtonsOnBottom>
    </Container>
  )
}
