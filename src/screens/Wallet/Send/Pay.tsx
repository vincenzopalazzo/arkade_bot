import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext, emptySendInfo } from '../../../providers/flow'
import Padded from '../../../components/Padded'
import { WalletContext } from '../../../providers/wallet'
import Error from '../../../components/Error'
import { extractError } from '../../../lib/error'
import { collaborativeRedeem, sendAsync } from '../../../lib/asp'
import Loading from '../../../components/Loading'
import Header from '../../../components/Header'
import Content from '../../../components/Content'

export default function SendPayment() {
  const { navigate } = useContext(NavigationContext)
  const { sendInfo, setSendInfo } = useContext(FlowContext)
  const { wallet } = useContext(WalletContext)

  const [error, setError] = useState('')

  const { address, arkAddress, satoshis } = sendInfo

  if (!address && !arkAddress) return <Error error text='No recipients to send' />
  if (!satoshis) return <Error error text='Send amount not specified' />

  const onTxid = (txid: string) => {
    if (!txid) return setError('Error sending transaction')
    setSendInfo({ ...sendInfo, txid })
    navigate(Pages.SendSuccess)
  }

  const goBackToWallet = () => {
    setSendInfo(emptySendInfo)
    navigate(Pages.Wallet)
  }

  useEffect(() => {
    if (wallet.initialized && satoshis) {
      try {
        if (arkAddress) {
          sendAsync(satoshis, arkAddress)
            .then((txid) => onTxid(txid))
            .catch((error) => setError(extractError(error)))
        } else if (address) {
          collaborativeRedeem(satoshis, address)
            .then((txid) => onTxid(txid))
            .catch((error) => setError(extractError(error)))
        }
      } catch (error) {
        console.log(error)
        setError(extractError(error))
      }
    }
  }, [wallet.initialized])

  const text = arkAddress
    ? 'Paying inside the Ark'
    : 'Payments to mainnet require a round, which can take a few seconds'

  return (
    <>
      <Header text='Sending' back={() => navigate(Pages.SendDetails)} />
      <Content>
        {error ? (
          <Padded>
            <Error error={Boolean(error)} text={error} />
          </Padded>
        ) : (
          <Loading text={text} />
        )}
      </Content>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </>
  )
}
