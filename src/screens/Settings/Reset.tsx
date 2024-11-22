import { useContext } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { WalletContext } from '../../providers/wallet'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import Header from './Header'
import { NavigationContext, Pages } from '../../providers/navigation'

export default function Reset({ backup }: { backup: () => void }) {
  const { navigate } = useContext(NavigationContext)
  const { resetWallet } = useContext(WalletContext)

  const handleReset = () => {
    resetWallet()
    navigate(Pages.Init)
  }

  return (
    <>
      <Header text='Reset wallet' back />
      <Content>
        <Padded>
          <div className='flex flex-col gap-6 mt-10'>
            <p>
              Did you{' '}
              <span className='underline underline-offset-2 cursor-pointer' onClick={backup}>
                backup your wallet
              </span>
              ?
            </p>
            <p>This operation cannot be undone.</p>
          </div>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleReset} label='Reset wallet' />
      </ButtonsOnBottom>
    </>
  )
}
