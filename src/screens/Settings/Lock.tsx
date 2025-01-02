import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { WalletContext } from '../../providers/wallet'
import Padded from '../../components/Padded'
import { NavigationContext, Pages } from '../../providers/navigation'
import { extractError } from '../../lib/error'
import Content from '../../components/Content'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import InputPassword from '../../components/InputPassword'
import Header from './Header'
import FlexCol from '../../components/FlexCol'
import { TextSecondary } from '../../components/Text'

export default function Lock() {
  const { navigate } = useContext(NavigationContext)
  const { lockWallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [label, setLabel] = useState('Lock')
  const [password, setPassword] = useState('')
  const [locking, setLocking] = useState(false)

  useEffect(() => {
    setLabel(locking ? 'Locking...' : 'Lock')
  }, [locking])

  const handleChange = (pass: string) => {
    setError('')
    setPassword(pass)
    lockWallet(pass)
      .then(() => navigate(Pages.Unlock))
      .catch(() => {})
  }

  const handleLock = async () => {
    setLocking(true)
    lockWallet(password)
      .then(() => {
        setPassword('')
        setLocking(false)
        navigate(Pages.Unlock)
      })
      .catch((err) => {
        setError(extractError(err))
      })
  }

  return (
    <>
      <Header text='Lock' back />
      <Content>
        {locking ? (
          <Loading />
        ) : (
          <Padded>
            <FlexCol>
              <InputPassword label='Insert password' onChange={handleChange} />
              <Error error={Boolean(error)} text={error} />
              <TextSecondary>After locking you'll need to re-enter your password to unlock.</TextSecondary>
            </FlexCol>
          </Padded>
        )}
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleLock} label={label} disabled={locking} />
      </ButtonsOnBottom>
    </>
  )
}
