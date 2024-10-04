import { useContext, useState } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Content from '../../components/Content'
import Container from '../../components/Container'
import TransactionsList from '../../components/TransactionsList'
import { WalletContext } from '../../providers/wallet'

export default function Transactions() {
  const { navigate } = useContext(NavigationContext)
  const { settlePending, wallet } = useContext(WalletContext)

  const defaultButtonLabel = 'Settle pending'
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)

  const goBackToWallet = () => navigate(Pages.Wallet)

  const showClaimButton = wallet.txs.reduce((acc, tx) => tx.isPending || acc, false)
  const disabled = buttonLabel !== defaultButtonLabel

  const handleClaim = async () => {
    setButtonLabel('Settling...')
    await settlePending()
    setButtonLabel(defaultButtonLabel)
  }

  return (
    <Container>
      <Content>
        <Title text='Transactions' />
        <TransactionsList />
      </Content>
      <ButtonsOnBottom>
        {showClaimButton ? <Button onClick={handleClaim} label={buttonLabel} disabled={disabled} /> : null}
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
