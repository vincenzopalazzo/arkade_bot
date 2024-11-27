import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import TransactionsList from '../../components/TransactionsList'
import { WalletContext } from '../../providers/wallet'
import Loading from '../../components/Loading'
import BackToWalletButton from '../../components/BackToWalletButton'

export default function Transactions() {
  const { settlePending, wallet } = useContext(WalletContext)

  const defaultButtonLabel = 'Settle pending'
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [settling, setSettling] = useState(false)

  const showSettleButton = wallet.txs.reduce((acc, tx) => tx.pending || acc, false)

  const handleSettle = async () => {
    setSettling(true)
    await settlePending()
    setSettling(false)
  }

  useEffect(() => {
    setButtonLabel(settling ? 'Settling...' : defaultButtonLabel)
  }, [settling])

  return (
    <Content>
      <Padded>
        <Title text='Transactions' />
        {settling ? (
          <Loading text='Settling transactions require a round, which can take a few seconds' />
        ) : (
          <TransactionsList />
        )}
      </Padded>
      <ButtonsOnBottom>
        {showSettleButton ? <Button onClick={handleSettle} label={buttonLabel} disabled={settling} /> : null}
        <BackToWalletButton />
      </ButtonsOnBottom>
    </Content>
  )
}
