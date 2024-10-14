import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Content from '../../components/Content'
import Container from '../../components/Container'
import { WalletContext } from '../../providers/wallet'
import Error from '../../components/Error'
import Input from '../../components/Input'
import { extractError } from '../../lib/error'

export default function Unlock() {
  const { navigate } = useContext(NavigationContext)
  const { unlockWallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [label, setLabel] = useState('Unlock')
  const [password, setPassword] = useState('')
  const [unlocking, setUnlocking] = useState(false)

  useEffect(() => {
    setLabel(unlocking ? 'Unlocking' : 'Unlock')
  }, [unlocking])

  const handleChange = (pass: string) => {
    setPassword(pass)
    unlockWallet(pass)
      .then(() => navigate(Pages.Wallet))
      .catch(() => {})
  }

  const handleUnlock = async (pass: string) => {
    setUnlocking(true)
    unlockWallet(pass)
      .then(() => navigate(Pages.Wallet))
      .catch((err) => {
        setError(extractError(err))
        setUnlocking(false)
      })
  }

  return (
    <Container>
      <Content>
        <Title text={label} subtext='Access your wallet' />
        {unlocking ? null : (
          <div className='flex flex-col gap-4'>
            <Input label='Insert password' onChange={handleChange} type='password' />
            <Error error={Boolean(error)} text={error} />
          </div>
        )}
      </Content>
      <ButtonsOnBottom>
        <Button onClick={() => handleUnlock(password)} label='Unlock' disabled={unlocking} />
      </ButtonsOnBottom>
    </Container>
  )
}
