import { useContext, useEffect } from 'react'
import Balance from '../../components/Balance'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Container from '../../components/Container'
import Content from '../../components/Content'
import QRCodeIcon from '../../icons/QRCode'
import ScanIcon from '../../icons/Scan'
import TransactionsList from '../../components/TransactionsList'
import { dustLimit } from '../../lib/constants'
import { WalletContext } from '../../providers/wallet'

export default function Wallet() {
  const { navigate } = useContext(NavigationContext)
  const { reloadWallet, wallet } = useContext(WalletContext)

  const canSend = wallet.balance > dustLimit

  useEffect(() => {
    reloadWallet()
  }, [])

  return (
    <Container>
      <Content>
        <Balance sats={wallet.balance} />
        <TransactionsList short />
      </Content>
      <ButtonsOnBottom>
        <Button icon={<ScanIcon />} label='Send' onClick={() => navigate(Pages.SendInvoice)} disabled={!canSend} />
        <Button icon={<QRCodeIcon />} label='Receive' onClick={() => navigate(Pages.ReceiveAmount)} />
      </ButtonsOnBottom>
    </Container>
  )
}
