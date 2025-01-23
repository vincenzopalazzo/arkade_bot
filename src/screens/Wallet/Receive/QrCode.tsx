import { useContext, useEffect, useRef, useState } from 'react'
import Button from '../../../components/Button'
import Padded from '../../../components/Padded'
import QrCode from '../../../components/QrCode'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import Error from '../../../components/Error'
import { FlowContext } from '../../../providers/flow'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { extractError } from '../../../lib/error'
import * as bip21 from '../../../lib/bip21'
import { getBalance } from '../../../lib/asp'
import { WalletContext } from '../../../providers/wallet'
import { NotificationsContext } from '../../../providers/notifications'
import Header from '../../../components/Header'
import Content from '../../../components/Content'
import { consoleError, consoleLog } from '../../../lib/logs'
import { canBrowserShareData, shareData } from '../../../lib/share'

export default function ReceiveQRCode() {
  const { recvInfo, setRecvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { notifyPaymentReceived } = useContext(NotificationsContext)
  const { wallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [sharing, setSharing] = useState(false)

  const poolAspIntervalId = useRef<NodeJS.Timeout>()

  const { boardingAddr, offchainAddr, satoshis } = recvInfo
  const bip21uri = bip21.encode(boardingAddr, offchainAddr, satoshis)

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
    } catch (err) {
      consoleError('error waiting for payment', err)
      setError(extractError(err))
    }
    return () => clearInterval(poolAspIntervalId.current)
  }, [wallet])

  const onFinish = (satoshis: number) => {
    clearInterval(poolAspIntervalId.current)
    setRecvInfo({ ...recvInfo, satoshis })
    notifyPaymentReceived(satoshis)
    navigate(Pages.ReceiveSuccess)
  }

  const handleShare = () => {
    setSharing(true)
    shareData(data)
      .catch(consoleLog)
      .finally(() => setSharing(false))
  }

  const data = { title: 'Receive', text: bip21uri }
  const disabled = !canBrowserShareData(data) || sharing

  return (
    <>
      <Header text='Receive' back={() => navigate(Pages.ReceiveAmount)} />
      <Content>
        <Padded>
          <Error error={Boolean(error)} text={error} />
          <QrCode short={offchainAddr} value={bip21uri ?? ''} />
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleShare} label='Share' disabled={disabled} />
      </ButtonsOnBottom>
    </>
  )
}
