import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'
import Error from '../../components/Error'
import { extractError } from '../../lib/error'
import InputPassword from '../../components/InputPassword'
import Header from '../../components/Header'
import { consoleError } from '../../lib/logs'

export default function Unlock() {
  const { unlockWallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [label, setLabel] = useState('Unlock')
  const [password, setPassword] = useState('')
  const [unlocking, setUnlocking] = useState(false)

  useEffect(() => {
    setLabel(unlocking ? 'Unlocking' : 'Unlock')
  }, [unlocking])

  const handleChange = (ev: Event) => {
    const password = (ev.target as HTMLInputElement).value
    setPassword(password)
    unlockWallet(password).catch()
  }

  const handleUnlock = async () => {
    if (!password) return
    setUnlocking(true)
    unlockWallet(password).catch((err) => {
      consoleError('error unlocking wallet', err)
      setError(extractError(err))
      setUnlocking(false)
    })
  }

  return (
    <>
      <Header text='Unlock' />
      <Content>
        <Padded>
          {unlocking ? null : (
            <form>
              <InputPassword label='Insert password' onChange={handleChange} />
            </form>
          )}
          <Error error={Boolean(error)} text={error} />
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleUnlock} label={label} disabled={unlocking} />
      </ButtonsOnBottom>
    </>
  )
}
