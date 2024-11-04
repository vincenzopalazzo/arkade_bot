import { useContext, useEffect, useRef, useState } from 'react'
import Button from '../../../components/Button'
import Content from '../../../components/Content'
import Title from '../../../components/Title'
import QrCode from '../../../components/QrCode'
import Container from '../../../components/Container'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import Error from '../../../components/Error'
import { FlowContext, emptyRecvInfo } from '../../../providers/flow'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { extractError } from '../../../lib/error'
import { copyToClipboard } from '../../../lib/clipboard'
import * as bip21 from '../../../lib/bip21'
import { getBalance } from '../../../lib/asp'
import { WalletContext } from '../../../providers/wallet'
import { NotificationsContext } from '../../../providers/notifications'

export default function ReceiveInvoice() {
  const { recvInfo, setRecvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyPaymentReceived } = useContext(NotificationsContext)
  const { wallet } = useContext(WalletContext)

  const label = 'Copy to clipboard'
  const [buttonLabel, setButtonLabel] = useState(label)
  const [error, setError] = useState('')

  const poolAspIntervalId = useRef<NodeJS.Timeout>()

  const firefox = !navigator.clipboard || !('writeText' in navigator.clipboard)

  const { boardingAddr, offchainAddr, satoshis } = recvInfo

  const onFinish = (satoshis: number) => {
    console.log('satoshis received', satoshis)
    clearInterval(poolAspIntervalId.current)
    setRecvInfo({ ...recvInfo, satoshis })
    notifyPaymentReceived(satoshis)
    navigate(Pages.ReceiveSuccess)
  }

  const handleCancel = () => {
    clearInterval(poolAspIntervalId.current)
    setRecvInfo(emptyRecvInfo)
    navigate(Pages.Wallet)
  }

  const handleCopy = async () => {
    await copyToClipboard(bip21uri ?? '')
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(label), 2100)
  }

  useEffect(() => {
    if (!wallet) return
    try {
      poolAspIntervalId.current = setInterval(() => {
        getBalance().then((balance) => {
          if (balance > wallet.balance) {
            clearInterval(poolAspIntervalId.current)
            onFinish(balance - wallet.balance)
          }
        })
      }, 1000)
    } catch (error) {
      setError(extractError(error))
    }
    return () => clearInterval(poolAspIntervalId.current)
  }, [])

  const bip21uri = bip21.encode(boardingAddr, offchainAddr, satoshis)
  if (firefox) console.log('bip21uri', bip21uri)

  return (
    <Container>
      <Content>
        <Title text='Invoice' subtext='Scan or copy to clipboard' />
        <div className='flex flex-col gap-2'>
          <Error error={Boolean(error)} text={error} />
          <div>
            <QrCode short={offchainAddr} value={bip21uri ?? ''} />
          </div>
        </div>
      </Content>
      <ButtonsOnBottom>
        {!firefox && <Button onClick={handleCopy} label={buttonLabel} />}
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
