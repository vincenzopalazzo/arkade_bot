import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext, emptySendInfo } from '../../../providers/flow'
import Content from '../../../components/Content'
import Title from '../../../components/Title'
import Container from '../../../components/Container'
import { prettyNumber } from '../../../lib/format'
import { WalletContext } from '../../../providers/wallet'
import Error from '../../../components/Error'
import { extractError } from '../../../lib/error'
import { collaborativeRedeem, sendAsync } from '../../../lib/asp'
import Loading from '../../../components/Loading'

export default function SendPayment() {
  const { navigate } = useContext(NavigationContext)
  const { sendInfo, setSendInfo } = useContext(FlowContext)
  const { wallet } = useContext(WalletContext)

  const [error, setError] = useState('')

  const { address, arkAddress, satoshis } = sendInfo

  if (!address && !arkAddress) return <Error error text='No recipients to send' />
  if (!satoshis) return <Error error text='Send amount not specified' />

  const onTxid = (txid: string) => {
    console.log('onTxid', txid)
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

  const text = address ? 'Payments to mainnet require a round, which can take a few seconds' : undefined

  return (
    <Container>
      <Content>
        <Title text='Pay' subtext={`Paying ${prettyNumber(satoshis ?? 0)} sats`} />
        {error ? <Error error={Boolean(error)} text={error} /> : <Loading text={text} />}
      </Content>
      <ButtonsOnBottom>
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
