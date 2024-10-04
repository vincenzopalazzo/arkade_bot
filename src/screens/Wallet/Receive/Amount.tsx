import { useContext, useState } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext, emptyRecvInfo } from '../../../providers/flow'
import Title from '../../../components/Title'
import Content from '../../../components/Content'
import InputAmount from '../../../components/InputAmount'
import Container from '../../../components/Container'
import Error from '../../../components/Error'
import { getReceivingAddresses } from '../../../lib/asp'
import { extractError } from '../../../lib/error'

export default function ReceiveAmount() {
  const { setRecvInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)

  const defaultButtonLabel = 'Continue without amount'

  const [amount, setAmount] = useState(0)
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [error, setError] = useState('')

  const handleCancel = () => {
    setRecvInfo(emptyRecvInfo)
    navigate(Pages.Wallet)
  }

  const handleChange = (sats: number) => {
    setAmount(sats)
    setButtonLabel(sats ? 'Continue' : defaultButtonLabel)
  }

  const handleProceed = async () => {
    try {
      const { offchainAddr, boardingAddr } = await getReceivingAddresses()
      if (!offchainAddr) throw 'Unable to get offchain address'
      if (!boardingAddr) throw 'Unable to get boarding address'
      setRecvInfo({ boardingAddr, offchainAddr, satoshis: amount })
      navigate(Pages.ReceiveInvoice)
    } catch (err) {
      setError(extractError(err))
    }
  }

  return (
    <Container>
      <Content>
        <Title text='Receive' subtext='How much to receive on Ark' />
        <Error error={Boolean(error)} text={error} />
        <InputAmount label='Amount' onChange={handleChange} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleProceed} label={buttonLabel} />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
