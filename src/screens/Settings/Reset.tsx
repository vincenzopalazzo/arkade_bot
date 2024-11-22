import { useContext } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { WalletContext } from '../../providers/wallet'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import Header from './Header'
import { NavigationContext, Pages } from '../../providers/navigation'
import { TextEmphasys, TextNormal } from '../../components/Text'

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
          <TextEmphasys>Did you backup your wallet?</TextEmphasys>
          <TextNormal color='dark80'>This operation cannot be undone.</TextNormal>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleReset} label='Reset wallet' />
      </ButtonsOnBottom>
    </>
  )
}
