import { useContext, useState } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import Padded from '../../../components/Padded'
import Error from '../../../components/Error'
import { getReceivingAddresses } from '../../../lib/asp'
import { extractError } from '../../../lib/error'
import Header from '../../../components/Header'
import InputAmount from '../../../components/InputAmount'
import Content from '../../../components/Content'
import FlexCol from '../../../components/FlexCol'
import Keyboard from '../../../components/Keyboard'
import { WalletContext } from '../../../providers/wallet'
import { NetworkName } from '../../../lib/network'
import { faucet, sleep } from '../../../lib/faucet'
import Loading from '../../../components/Loading'
import { prettyNumber } from '../../../lib/format'

export default function ReceiveAmount() {
  const { setRecvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { reloadWallet, wallet } = useContext(WalletContext)

  const defaultButtonLabel = 'Continue without amount'

  const [amount, setAmount] = useState(0)
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [error, setError] = useState('')
  const [fauceting, setFauceting] = useState(false)
  const [showKeys, setShowKeys] = useState(false)

  const handleChange = (sats: number) => {
    setAmount(sats)
    setButtonLabel(sats ? 'Continue' : defaultButtonLabel)
  }

  const handleFaucet = async () => {
    try {
      if (!amount) throw 'Invalid amount'
      const { boardingAddr } = await getReceivingAddresses()
      if (!boardingAddr) throw 'Unable to get boarding address'
      setFauceting(true)
      const ok = await faucet(boardingAddr, amount)
      if (!ok) throw 'Error accessing faucet'
      await sleep(2) // give time for server to find out about tx
      reloadWallet() // before reloading the wallet
      navigate(Pages.Wallet)
    } catch (err) {
      setFauceting(false)
      setError(extractError(err))
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

  const showFaucetButton = wallet.balance === 0 && wallet.network === NetworkName.Signet

  if (showKeys) {
    return <Keyboard back={() => setShowKeys(false)} hideBalance onChange={handleChange} value={amount} />
  }

  if (fauceting) {
    return (
      <>
        <Header text='Fauceting' />
        <Content>
          <Loading text={`Getting ${prettyNumber(amount)} sats from signet faucet, this can take a few seconds`} />
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
