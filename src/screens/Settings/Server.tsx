import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Content from '../../components/Content'
import Padded from '../../components/Padded'
import Error from '../../components/Error'
import { ConfigContext } from '../../providers/config'
import { getAspInfo } from '../../lib/asp'
import { clearStorage } from '../../lib/storage'
import { WalletContext } from '../../providers/wallet'
import { NavigationContext, Pages } from '../../providers/navigation'
import Header from './Header'
import WarningBox from '../../components/Warning'
import InputUrl from '../../components/InputUrl'
import FlexCol from '../../components/FlexCol'
import Scanner from '../../components/Scanner'

export default function Server() {
  const { config, updateConfig } = useContext(ConfigContext)
  const { navigate } = useContext(NavigationContext)
  const { updateWallet, wallet } = useContext(WalletContext)

  const [aspUrl, setAspUrl] = useState('')
  const [error, setError] = useState('')
  const [found, setFound] = useState(false)
  const [scan, setScan] = useState(false)

  useEffect(() => {
    if (!aspUrl) return
    if (aspUrl === config.aspUrl) {
      setError('Same server')
    } else {
      setError('')
      getAspInfo(aspUrl).then((info) => {
        setError(info.unreachable ? 'Unable to connect' : '')
        setFound(Boolean(info.pubkey))
      })
    }
  }, [aspUrl])

  const handleNewServer = () => {
    clearStorage()
    updateConfig({ ...config, aspUrl })
    updateWallet({ ...wallet, initialized: false })
    navigate(Pages.Init)
  }

  if (scan) return <Scanner close={() => setScan(false)} label='Server URL' setData={setAspUrl} setError={setError} />

  return (
    <>
      <Header text='Server' back />
      <Content>
        <Padded>
          <FlexCol>
            <InputUrl label='Server URL' onChange={setAspUrl} openScan={() => setScan(true)} value={aspUrl} />
            <Error error={Boolean(error)} text={error} />
            {found && !error ? <WarningBox green text='Server found' /> : null}
            <WarningBox text='Your wallet will be reseted. Make sure you backup your wallet first.' />
          </FlexCol>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleNewServer} label='Connect to server' disabled={!found || Boolean(error)} />
      </ButtonsOnBottom>
    </>
  )
}
