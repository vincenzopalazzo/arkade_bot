import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import ShowError from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import Content from '../../../components/Content'
import { decodeArkAddress } from '../../../lib/address'
import { AspContext } from '../../../providers/asp'
import * as bip21 from '../../../lib/bip21'
import { ArkNote, isArkNote } from '../../../lib/arknote'
import InputAmount from '../../../components/InputAmount'
import InputAddress from '../../../components/InputAddress'
import Header from '../../../components/Header'

export default function SendInvoice() {
  const { aspInfo } = useContext(AspContext)
  const { navigate } = useContext(NavigationContext)
  const { sendInfo, setNoteInfo, setSendInfo } = useContext(FlowContext)

  const [destination, setDestination] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState('')
  const [satoshis, setSatoshis] = useState(0)

  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const { address, arkAddress, satoshis } = sendInfo
    if (address) setAddress(address)
    if (arkAddress) setAddress(arkAddress)
    if (satoshis) setAmount(satoshis)
  }, [])

  useEffect(() => {
    setError('')
    if (!address) return
    const lowerCaseData = address.toLowerCase()
    if (bip21.isBip21(lowerCaseData)) {
      const { address, arkAddress, satoshis } = bip21.decode(lowerCaseData)
      if (satoshis) setSatoshis(satoshis)
      if (arkAddress) return setDestination(arkAddress)
      if (address) return setDestination(address)
      return setError('Unable to parse bip21')
    }
    if (/^t*ark1/.test(lowerCaseData)) {
      const { aspKey } = decodeArkAddress(lowerCaseData)
      if (aspKey !== aspInfo.pubkey) return setError('Invalid ASP pubkey')
      return setDestination(lowerCaseData)
    }
    if (/^bc1/.test(lowerCaseData) || /^tb1/.test(lowerCaseData)) {
      return setDestination(lowerCaseData)
    }
    if (isArkNote(lowerCaseData)) {
      try {
        const anote = ArkNote.fromString(address)
        setNoteInfo({ note: address, satoshis: anote.data.value })
        return navigate(Pages.NoteRedeem)
      } catch (_) {}
    }
    setError('Invalid address or invoice')
  }, [address])

  useEffect(() => {
    setSatoshis(amount)
  }, [amount])

  useEffect(() => {
    setDisabled(!(destination && satoshis && satoshis > 0))
  }, [destination, satoshis])

  const handleContinue = () => {
    setSendInfo({ address: destination, satoshis })
    navigate(Pages.SendDetails)
  }

  return (
    <>
      <Content>
        <Header text='Send' />
        <ShowError error={Boolean(error)} text={error} />
        <InputAddress label='Address' onChange={setAddress} value={address} />
        <InputAmount label='Amount' onChange={setAmount} value={satoshis} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleContinue} label='Continue' disabled={disabled} />
      </ButtonsOnBottom>
    </>
  )
}
