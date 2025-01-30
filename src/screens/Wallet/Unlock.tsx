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
import FlexCol from '../../components/FlexCol'

export default function Unlock() {
  const { reloadWallet, unlockWallet } = useContext(WalletContext)

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
    unlockWallet(password)
      .then(reloadWallet)
      .catch(() => {})
  }

  const handleUnlock = async () => {
    if (!password) return
    setUnlocking(true)
    unlockWallet(password)
      .then(reloadWallet)
      .catch((err) => {
        consoleError(err, 'error unlocking wallet')
        setError(extractError(err))
        setUnlocking(false)
      })
  }

  return (
    <>
      <Header text='Unlock' />
      <Content>
        <Padded>
          <form>
            <FlexCol gap='1rem'>
              {unlocking ? null : <InputPassword focus label='Insert password' onChange={handleChange} />}
              <Error error={Boolean(error)} text={error} />
            </FlexCol>
          </form>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleUnlock} label={label} disabled={unlocking} />
      </ButtonsOnBottom>
    </>
  )
}
