import { useContext, useState } from 'react'
import Button from '../../../components/Button'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext, emptySendInfo } from '../../../providers/flow'
import Title from '../../../components/Title'
import Content from '../../../components/Content'
import InputAmount from '../../../components/InputAmount'
import Container from '../../../components/Container'
import { WalletContext } from '../../../providers/wallet'
import { AspContext } from '../../../providers/asp'
import { prettyNumber } from '../../../lib/format'
import TipIcon from '../../../icons/Tip'

enum ButtonLabel {
  NoBalance = 'Not enough balance',
  Low = 'Amount too low',
  High = 'Amount too high',
  Nok = 'Something went wrong',
  Ok = 'Continue',
}

export default function SendAmount() {
  const { aspInfo } = useContext(AspContext)
  const { sendInfo, setSendInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { wallet } = useContext(WalletContext)

  const [amount, setAmount] = useState(0)

  const handleCancel = () => {
    setSendInfo(emptySendInfo)
    navigate(Pages.Wallet)
  }

  const handleProceed = async () => {
    setSendInfo({ ...sendInfo, satoshis: amount })
    navigate(Pages.SendDetails)
  }

  const label =
    amount > wallet.balance ? ButtonLabel.NoBalance : amount < aspInfo.dust ? ButtonLabel.Low : ButtonLabel.Ok

  const disabled = label !== ButtonLabel.Ok

  return (
    <Container>
      <Content>
        <Title text='Send' subtext={`Balance ${prettyNumber(wallet.balance)} sats`} />
        <div className='flex flex-col gap-4'>
          <InputAmount amount={amount} label='Amount' onChange={setAmount} />
          <div className='flex justify-center align-middle cursor-pointer' onClick={() => setAmount(wallet.balance)}>
            <TipIcon small />
            <p className='text-sm'>Send all</p>
          </div>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleProceed} label={label} disabled={disabled} />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
