import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Error from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import Padded from '../../../components/Padded'
import { decodeArkAddress, isArkAddress, isBTCAddress } from '../../../lib/address'
import { AspContext } from '../../../providers/asp'
import * as bip21 from '../../../lib/bip21'
import { ArkNote, isArkNote } from '../../../lib/arknote'
import InputAmount from '../../../components/InputAmount'
import InputAddress from '../../../components/InputAddress'
import Header from '../../../components/Header'
import { WalletContext } from '../../../providers/wallet'
import { prettyNumber } from '../../../lib/format'
import Content from '../../../components/Content'
import FlexCol from '../../../components/FlexCols'
import Keyboard from '../../../components/Keyboard'
import Text from '../../../components/Text'
import BarcodeScanner from '../../../components/BarcodeScanner'

export default function SendForm() {
  const { aspInfo } = useContext(AspContext)
  const { navigate } = useContext(NavigationContext)
  const { sendInfo, setNoteInfo, setSendInfo } = useContext(FlowContext)
  const { wallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [showKeys, setShowKeys] = useState(false)
  const [showScan, setShowScan] = useState(false)

  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState('')

  useEffect(() => {
    const { recipient, satoshis } = sendInfo
    setRecipient(recipient ?? '')
    setAmount(satoshis ?? 0)
  }, [])

  useEffect(() => {
    setError('')
    if (!recipient) return
    const lowerCaseData = recipient.toLowerCase()
    if (bip21.isBip21(lowerCaseData)) {
      const { address, arkAddress, satoshis } = bip21.decode(lowerCaseData)
      if (!address && !arkAddress) return setError('Unable to parse bip21')
      setAmount(satoshis ?? 0)
      return setSendInfo({ address, arkAddress, recipient, satoshis })
    }
    if (isArkAddress(lowerCaseData)) {
      const { aspKey } = decodeArkAddress(lowerCaseData)
      if (aspKey !== aspInfo.pubkey.slice(2)) return setError('Invalid ASP pubkey')
      return setSendInfo({ arkAddress: lowerCaseData })
    }
    if (isBTCAddress(lowerCaseData)) {
      return setSendInfo({ address: lowerCaseData })
    }
    if (isArkNote(lowerCaseData)) {
      try {
        const anote = ArkNote.fromString(recipient)
        setNoteInfo({ note: recipient, satoshis: anote.data.value })
        return navigate(Pages.NotesRedeem)
      } catch (_) {}
    }
    setError('Invalid recipient address')
  }, [recipient])

  useEffect(() => {
    setSendInfo({ ...sendInfo, satoshis: amount })
  }, [amount])

  const handleContinue = () => {
    setSendInfo({ ...sendInfo, satoshis: amount })
    navigate(Pages.SendDetails)
  }

  const handleFocus = () => {
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints
    if (isMobile) setShowKeys(true)
  }

  const Available = () => (
    <Text color='dark50' smaller>
      {`${prettyNumber(wallet.balance)} sats available`}
    </Text>
  )

  const { address, arkAddress, satoshis } = sendInfo
  const disabled = !((address || arkAddress) && satoshis && satoshis > 0)

  return showKeys ? (
    <Keyboard back={() => setShowKeys(false)} onChange={setAmount} value={amount} />
  ) : showScan ? (
    <>
      <Header text='Send' back={() => setShowScan(false)} />
      <Content>
        <BarcodeScanner setData={setRecipient} setError={setError} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={() => setShowScan(false)} label='Cancel' />
      </ButtonsOnBottom>
    </>
  ) : (
    <>
      <Content>
        <Padded>
          <FlexCol gap='2rem'>
            <Error error={Boolean(error)} text={error} />
            <InputAddress label='Recipient address' onChange={setRecipient} value={recipient} />
            <InputAmount
              label='Amount'
              onChange={setAmount}
              onFocus={handleFocus}
              right={<Available />}
              value={amount}
            />
          </FlexCol>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleContinue} label='Continue' disabled={disabled} />
      </ButtonsOnBottom>
    </>
  )
}
