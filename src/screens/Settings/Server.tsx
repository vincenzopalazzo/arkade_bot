import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Container from '../../components/Container'
import Content from '../../components/Content'
import Error from '../../components/Error'
import Input from '../../components/Input'
import Title from '../../components/Title'
import { ConfigContext } from '../../providers/config'
import { getAspInfo } from '../../lib/asp'
import { clearStorage } from '../../lib/storage'
import { WalletContext } from '../../providers/wallet'
import { NavigationContext, Pages } from '../../providers/navigation'

export default function Server({ backup }: { backup: () => void }) {
  const { config, toggleShowConfig, updateConfig } = useContext(ConfigContext)
  const { navigate } = useContext(NavigationContext)
  const { updateWallet, wallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [found, setFound] = useState(false)
  const [aspUrl, setAspUrl] = useState('')

  useEffect(() => {
    if (!aspUrl) return
    setError(aspUrl === config.aspUrl ? 'Same server' : '')
    getAspInfo(aspUrl).then((info) => setFound(Boolean(info.pubkey)))
  }, [aspUrl])

  const handleNewServer = () => {
    clearStorage()
    updateConfig({ ...config, aspUrl })
    updateWallet({ ...wallet, initialized: false })
    toggleShowConfig()
    navigate(Pages.Init)
  }

  return (
    <Container>
      <Content>
        <Title text='Server' subtext='Change server' />
        <div className='flex flex-col gap-4 mt-10'>
          <Input label='Server URL' onChange={setAspUrl} placeholder={config.aspUrl} />
          <Error error={Boolean(error)} text={error} />
          {found && !error ? <p className='font-semibold text-green-500'>Server found</p> : null}
        </div>
        <div className='flex flex-col gap-4 mt-10'>
          <p>Your wallet will be reseted</p>
          <p>
            Did you{' '}
            <span className='underline underline-offset-2 cursor-pointer' onClick={backup}>
              backup your wallet
            </span>
            ?
          </p>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleNewServer} label='Connect to server' disabled={!found || Boolean(error)} />
        <Button onClick={toggleShowConfig} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
