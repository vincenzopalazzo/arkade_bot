import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { WalletContext } from '../../providers/wallet'
import Content from '../../components/Content'
import { NavigationContext, Pages } from '../../providers/navigation'
import { extractError } from '../../lib/error'
import Container from '../../components/Container'
import Input from '../../components/Input'
import Error from '../../components/Error'
import Loading from '../../components/Loading'

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
      .then(() => navigate(Pages.Wallet))
      .catch(() => {})
  }

  const handleLock = async () => {
    setLocking(true)
    lockWallet(password)
      .then(() => navigate(Pages.Wallet))
      .catch((err) => {
        setError(extractError(err))
        setLocking(false)
      })
  }

  return (
    <Container>
      <Content>
        <Title text='Lock' />
        {locking ? (
          <Loading />
        ) : (
          <div className='flex flex-col gap-4 mt-10'>
            <Input label='Insert password' onChange={handleChange} type='password' />
            <Error error={Boolean(error)} text={error} />
            <p className='mt-10 mb-4 mx-auto'>After locking you'll need to re-enter your password to unlock</p>
          </div>
        )}
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleLock} label={label} disabled={locking} />
      </ButtonsOnBottom>
    </Container>
  )
}
