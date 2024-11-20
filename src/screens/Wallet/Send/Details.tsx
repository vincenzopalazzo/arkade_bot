import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import Content from '../../../components/Content'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import Details, { DetailsProps } from '../../../components/Details'
import Error from '../../../components/Error'
import { WalletContext } from '../../../providers/wallet'
import Header from '../../../components/Header'
import { IonContent } from '@ionic/react'
import { defaultFee } from '../../../lib/constants'
import { prettyNumber } from '../../../lib/format'

export default function SendDetails() {
  const { navigate } = useContext(NavigationContext)
  const { sendInfo } = useContext(FlowContext)
  const { wallet } = useContext(WalletContext)

  const [buttonLabel, setButtonLabel] = useState('')
  const [details, setDetails] = useState<DetailsProps>()
  const [error, setError] = useState('')

  const { address, arkAddress, satoshis } = sendInfo
  const feeInSats = defaultFee

  useEffect(() => {
    if (!address && !arkAddress) return setError('Missing address')
    if (!satoshis) return setError('Missing amount')
    const total = satoshis + feeInSats
    if (address) {
      setDetails({
        address,
        comment: 'Paying to mainnet',
        satoshis,
        fees: feeInSats,
        total,
      })
    }
    if (arkAddress) {
      setDetails({
        address: arkAddress,
        comment: 'Paying inside Ark',
        satoshis,
        fees: feeInSats,
        total,
      })
    }
    if (wallet.balance < total) {
      setButtonLabel('Insufficient funds')
      setError(`Insufficient funds, you just have ${prettyNumber(wallet.balance)} sats`)
    } else {
      setButtonLabel('Tap to Sign')
    }
  }, [sendInfo])

  const handleContinue = () => navigate(Pages.SendPayment)

  return (
    <>
      <IonContent>
        <Header text='Sign transaction' back={() => navigate(Pages.SendForm)} />
        <Content>
          <Error error={Boolean(error)} text={error} />
          <Details details={details} />
        </Content>
      </IonContent>
      <ButtonsOnBottom>
        <Button onClick={handleContinue} label={buttonLabel} disabled={Boolean(error)} />
      </ButtonsOnBottom>
    </>
  )
}
