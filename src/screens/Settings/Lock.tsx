import { useContext, useState } from 'react'
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

export default function Lock() {
  const { navigate } = useContext(NavigationContext)
  const { lockWallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [locking, setLocking] = useState(false)

  const handleChange = (e: any) => {
    setPassword(e.target.value)
    setError('')
  }

  const handleLock = async () => {
    setLocking(true)
    await new Promise((resolve) => setTimeout(resolve, 100))
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
          <div className='flex flex-col gap-4'>
            <p>Locking wallet.</p>
            <p>This can take a few seconds.</p>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <p className='mt-10 mb-4 max-w-64 mx-auto'>
              After locking you'll need to re-enter your password to unlock the wallet.
            </p>
            <Input label='Insert password' onChange={handleChange} type='password' />
            <Error error={Boolean(error)} text={error} />
          </div>
        )}
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleLock} label='Lock' disabled={locking} />
      </ButtonsOnBottom>
    </Container>
  )
}
