import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Title from '../../../components/Title'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import Content from '../../../components/Content'
import Container from '../../../components/Container'
import { FlowContext, emptySendInfo } from '../../../providers/flow'
import { prettyNumber } from '../../../lib/format'
import { WalletContext } from '../../../providers/wallet'
import Error from '../../../components/Error'
import Table from '../../../components/Table'
import { defaultFee } from '../../../lib/constants'

export default function SendFees() {
  const { wallet } = useContext(WalletContext)
  const { navigate } = useContext(NavigationContext)
  const { sendInfo, setSendInfo } = useContext(FlowContext)

  const [error, setError] = useState('')

  const { address, arkAddress, satoshis } = sendInfo
  const feeInSats = defaultFee // TODO

  useEffect(() => {
    if (wallet.initialized && satoshis) {
      if (arkAddress) {
        setSendInfo({ ...sendInfo, arkAddress, satoshis })
        return
      }
      if (address) {
        setSendInfo({ ...sendInfo, address, satoshis })
        return
      }
    }
  }, [address, arkAddress])

  useEffect(() => {
    if (!satoshis) return
    if (wallet.balance < satoshis + feeInSats) {
      setError(`Insufficient funds, you just have ${prettyNumber(wallet.balance)} sats`)
    }
  }, [satoshis])

  const handleCancel = () => {
    setSendInfo(emptySendInfo)
    navigate(Pages.Wallet)
  }

  const handlePay = () => navigate(Pages.SendPayment)

  const sats = satoshis ?? 0
  const label = error ? 'Something went wrong' : 'Pay'
  const prettyTotal = prettyNumber(sats + feeInSats)

  const data = [
    ['Amount', `${prettyNumber(satoshis)} sats`],
    ['Network fees', `${feeInSats.toString()} sats`],
    ['Total', `${prettyTotal} sats`],
  ].filter((row) => row[0] !== 'Boltz fees')

  return (
    <Container>
      <Content>
        <Title text='Payment fees' subtext={`You pay ${prettyTotal} sats`} />
        <div className='flex flex-col gap-2 mt-4'>
          <Error error={Boolean(error)} text={error} />
          <Table data={data} />
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handlePay} label={label} disabled={Boolean(error)} />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
