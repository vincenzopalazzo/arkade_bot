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
import FlexCol from '../../../components/flexCol'
import Keyboard from '../../../components/Keyboard'

export default function ReceiveAmount() {
  const { setRecvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)

  const defaultButtonLabel = 'Continue without amount'

  const [amount, setAmount] = useState(0)
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [error, setError] = useState('')
  const [showKeys, setShowKeys] = useState(false)

  const handleChange = (sats: number) => {
    setAmount(sats)
    setButtonLabel(sats ? 'Continue' : defaultButtonLabel)
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

  return (
    <>
      {showKeys ? (
        <Keyboard back={() => setShowKeys(false)} hideBalance onChange={handleChange} value={amount} />
      ) : (
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
            <Button onClick={handleProceed} label={buttonLabel} />
          </ButtonsOnBottom>
        </>
      )}
    </>
  )
}
