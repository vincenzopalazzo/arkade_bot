import { useContext, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { WalletContext } from '../../providers/wallet'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import Header from './Header'
import { NavigationContext, Pages } from '../../providers/navigation'
import Text from '../../components/Text'
import Checkbox from '../../components/Checkbox'

export default function Reset() {
  const { navigate } = useContext(NavigationContext)
  const { resetWallet } = useContext(WalletContext)

  const [disabled, setDisabled] = useState(true)

  const handleCheck = () => {
    setDisabled(!disabled)
  }

  const handleReset = () => {
    resetWallet()
    navigate(Pages.Init)
  }

  return (
    <>
      <Header text='Reset wallet' back />
      <Content>
        <Padded>
          <Text big>Did you backup your wallet?</Text>
          <Text color='dark80'>This operation cannot be undone.</Text>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Checkbox onChange={handleCheck} text='I have backed up my wallet' />
        <Button disabled={disabled} label='Reset wallet' onClick={handleReset} red />
      </ButtonsOnBottom>
    </>
  )
}
