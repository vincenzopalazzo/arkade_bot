import { useContext, useEffect, useState } from 'react'
import Balance from '../../components/Balance'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Container from '../../components/Container'
import Content from '../../components/Content'
import QRCodeIcon from '../../icons/QRCode'
import ScanIcon from '../../icons/Scan'
import TransactionsList from '../../components/TransactionsList'
import { WalletContext } from '../../providers/wallet'
import { AspContext } from '../../providers/asp'

export default function Wallet() {
  const { aspInfo } = useContext(AspContext)
  const { navigate } = useContext(NavigationContext)
  const { reloadWallet, wallet } = useContext(WalletContext)

  const [error, setError] = useState(false)
  const [lowFunds, setLowFunds] = useState(false)

  useEffect(() => {
    reloadWallet()
  }, [])

  useEffect(() => {
    setError(aspInfo.unreachable)
  }, [aspInfo.unreachable])

  useEffect(() => {
    if (!aspInfo.dust) return
    setLowFunds(wallet.balance < aspInfo.dust)
  }, [aspInfo.dust, wallet.balance])

  const handleRecv = () => navigate(Pages.ReceiveAmount)
  const handleSend = () => navigate(Pages.SendInvoice)

  return (
    <Container>
      <Content>
        <Balance sats={wallet.balance} />
        <div className='mt-4'>
          <TransactionsList short />
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button disabled={error || lowFunds} icon={<ScanIcon />} label='Send' onClick={handleSend} />
        <Button disabled={error} icon={<QRCodeIcon />} label='Receive' onClick={handleRecv} />
      </ButtonsOnBottom>
    </Container>
  )
}
