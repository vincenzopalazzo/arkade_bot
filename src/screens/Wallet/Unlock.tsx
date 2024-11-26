import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'
import Error from '../../components/Error'
import { extractError } from '../../lib/error'
import InputPassword from '../../components/InputPassword'
import Header from '../../components/Header'

export default function Unlock() {
  const { navigate } = useContext(NavigationContext)
  const { reloadWallet, unlockWallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [label, setLabel] = useState('Unlock')
  const [password, setPassword] = useState('')
  const [unlocking, setUnlocking] = useState(false)

  useEffect(() => {
    setLabel(unlocking ? 'Unlocking' : 'Unlock')
  }, [unlocking])

  const handleChange = (ev: Event) => {
    const pass = (ev.target as HTMLInputElement).value
    setPassword(pass)
    unlockWallet(pass)
      .then(() => navigate(Pages.Wallet))
      .catch(() => {})
  }

  const handleUnlock = async () => {
    if (!password) return
    setUnlocking(true)
    unlockWallet(password)
      .then(() => {
        reloadWallet()
        navigate(Pages.Wallet)
      })
      .catch((err) => {
        setError(extractError(err))
        setUnlocking(false)
      })
  }

  return (
    <>
      <Header text='Unlock' />
      <Content>
        <Padded>
          {unlocking ? null : <InputPassword label='Insert password' onChange={handleChange} />}
          <Error error={Boolean(error)} text={error} />
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleUnlock} label={label} disabled={unlocking} />
      </ButtonsOnBottom>
    </>
  )
}
