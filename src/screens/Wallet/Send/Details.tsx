import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext, emptySendInfo } from '../../../providers/flow'
import Content from '../../../components/Content'
import Title from '../../../components/Title'
import Container from '../../../components/Container'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import PaymentDetails, { PaymentDetailsProps } from '../../../components/PaymentDetails'
import Error from '../../../components/Error'
import { WalletContext } from '../../../providers/wallet'

export default function SendDetails() {
  const { navigate } = useContext(NavigationContext)
  const { sendInfo, setSendInfo } = useContext(FlowContext)
  const { wallet } = useContext(WalletContext)

  const [details, setDetails] = useState<PaymentDetailsProps>()
  const [error, setError] = useState('')

  const { address, arkAddress, satoshis } = sendInfo

  useEffect(() => {
    if (!address && !arkAddress) return setError('Missing address')
    if (arkAddress && satoshis) {
      return setDetails({
        address: arkAddress,
        note: 'Paying inside Ark',
        satoshis,
      })
    }
    if (address && satoshis) {
      return setDetails({
        address,
        note: 'Paying to mainnet',
        satoshis,
      })
    }
  }, [sendInfo])

  const handleContinue = () => navigate(Pages.SendFees)

  const handleCancel = () => {
    setSendInfo(emptySendInfo)
    navigate(Pages.Wallet)
  }

  const lowBalance = wallet.balance < (details?.satoshis ?? 0)
  const disabled = lowBalance || Boolean(error)
  const label = error ? 'Something went wrong' : lowBalance ? 'Insufficient funds' : 'Continue'

  return (
    <Container>
      <Content>
        <Title text='Payment details' />
        <div className='flex flex-col gap-2'>
          <Error error={Boolean(error)} text={error} />
          <PaymentDetails details={details} />
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleContinue} label={label} disabled={disabled} />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
