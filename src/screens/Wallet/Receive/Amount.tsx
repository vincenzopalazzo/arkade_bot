import { useContext, useState } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import Padded from '../../../components/Padded'
import Error from '../../../components/Error'
import { getReceivingAddresses, redeemNotes } from '../../../lib/asp'
import { extractError } from '../../../lib/error'
import Header from '../../../components/Header'
import InputAmount from '../../../components/InputAmount'
import Content from '../../../components/Content'
import FlexCol from '../../../components/FlexCol'
import Keyboard from '../../../components/Keyboard'
import { WalletContext } from '../../../providers/wallet'
import { NetworkName } from '../../../lib/network'
import { getNote } from '../../../lib/faucet'
import Loading from '../../../components/Loading'
import { prettyNumber } from '../../../lib/format'
import Success from '../../../components/Success'
import { ConfigContext } from '../../../providers/config'

export default function ReceiveAmount() {
  const { config } = useContext(ConfigContext)
  const { setRecvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { wallet } = useContext(WalletContext)

  const defaultButtonLabel = 'Continue without amount'

  const [amount, setAmount] = useState(0)
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [error, setError] = useState('')
  const [fauceting, setFauceting] = useState(false)
  const [showKeys, setShowKeys] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (sats: number) => {
    setAmount(sats)
    setButtonLabel(sats ? 'Continue' : defaultButtonLabel)
  }

  const handleFaucet = async () => {
    try {
      if (!amount) throw 'Invalid amount'
      setFauceting(true)
      const note = await getNote(amount, config.aspUrl)
      await redeemNotes([note])
      setFauceting(false)
      setSuccess(true)
    } catch (err) {
      setError(extractError(err))
      setFauceting(false)
    }
  }

  const handleFocus = () => {
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints
    if (isMobile) setShowKeys(true)
  }

  const handleProceed = async () => {
    try {
      const { offchainAddr, boardingAddr } = await getReceivingAddresses()
      if (!offchainAddr) throw 'Unable to get offchain address'
      if (!boardingAddr) throw 'Unable to get boarding address'
      setRecvInfo({ boardingAddr, offchainAddr, satoshis: amount })
      navigate(Pages.ReceiveQRCode)
    } catch (err) {
      setError(extractError(err))
    }
  }

  const showFaucetButton = wallet.balance !== 0 && wallet.network === NetworkName.Signet

  if (showKeys) {
    return <Keyboard back={() => setShowKeys(false)} hideBalance onChange={handleChange} value={amount} />
  }

  if (fauceting) {
    return (
      <>
        <Header text='Fauceting' />
        <Content>
          <Loading text='Getting sats from a faucet requires a round, which can take a few seconds' />
        </Content>
      </>
    )
  }

  if (success) {
    return (
      <>
        <Header text='Success' />
        <Content>
          <Success text={`${prettyNumber(amount)} sats fauceted`} />
        </Content>
      </>
    )
  }

  return (
    <>
      <Header text='Receive' />
      <Content>
        <Padded>
          <FlexCol>
            <Error error={Boolean(error)} text={error} />
            <InputAmount label='Amount' onChange={handleChange} onFocus={handleFocus} value={amount} />
          </FlexCol>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button label={buttonLabel} onClick={handleProceed} />
        {showFaucetButton ? <Button disabled={!amount} label='Faucet' onClick={handleFaucet} secondary /> : null}
      </ButtonsOnBottom>
    </>
  )
}
