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
import Select from '../../components/Select'

export default function Nostr() {
  const { config, toggleShowConfig, updateConfig } = useContext(ConfigContext)

  const label = 'Copy to clipboard'

  const [buttonLabel, setButtonLabel] = useState(label)
  const [npub, setNpub] = useState('')

  useEffect(() => {
    getPrivateKey().then((sk) => {
      setNpub(seedToNpub(sk))
    })
  }, [])

  const handleChange = (e: any) => {
    updateConfig({ ...config, nostr: Boolean(parseInt(e.target.value)) })
  }

  const handleClose = () => {
    toggleShowConfig()
  }

  const handleCopy = async () => {
    await copyToClipboard(npub)
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(label), 2100)
  }

  const value = config.nostr ? '1' : '0'

  return (
    <Container>
      <Content>
        <Title text='Nostr' subtext='Publish events to Nostr' />
        <div className='flex flex-col gap-10 mt-10'>
          <Select onChange={handleChange} value={value}>
            <option value='0'>Not allowed</option>
            <option value='1'>Allowed</option>
          </Select>
          {config.nostr ? (
            <>
              <Textarea label='Public key' value={npub} />
              <div className='flex justify-around'>
                <p className='underline underline-offset-2'>
                  <a href={`https://njump.me/${npub}`} target='_blank'>
                    Web view
                  </a>
                </p>
                <p className='underline underline-offset-2'>
                  <a href={`https://njump.me/${npub}.rss`} target='_blank'>
                    RSS view
                  </a>
                </p>
              </div>
            </>
          ) : null}
        </div>
      </Content>
      <ButtonsOnBottom>
        {config.nostr ? <Button onClick={handleCopy} label={buttonLabel} /> : null}
        <Button onClick={handleClose} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
