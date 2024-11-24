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
        <Padded>
          {locking ? (
            <Loading />
          ) : (
            <div className='flex flex-col gap-4 mt-10'>
              <InputPassword label='Insert password' onChange={handleChange} />
              <Error error={Boolean(error)} text={error} />
              <p className='mt-10 mb-4 mx-auto'>After locking you'll need to re-enter your password to unlock</p>
            </div>
          )}
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleLock} label={label} disabled={locking} />
      </ButtonsOnBottom>
    </>
  )
}
