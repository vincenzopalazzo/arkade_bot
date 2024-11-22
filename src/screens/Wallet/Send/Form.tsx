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
import Paste from '../../../components/Paste'
import FlexCol from '../../../components/flexCol'
import { pasteFromClipboard } from '../../../lib/clipboard'
import Keyboard from '../../../components/Keyboard'

export default function SendForm() {
  const { aspInfo } = useContext(AspContext)
  const { navigate } = useContext(NavigationContext)
  const { sendInfo, setNoteInfo, setSendInfo } = useContext(FlowContext)
  const { wallet } = useContext(WalletContext)

  const [clipboard, setClipboard] = useState('')
  const [destination, setDestination] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState('')
  const [satoshis, setSatoshis] = useState(0)
  const [showKeys, setShowKeys] = useState(false)

  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    pasteFromClipboard().then((value) => {
      const lowerCaseData = value.toLowerCase()
      if (
        bip21.isBip21(lowerCaseData) ||
        isArkAddress(lowerCaseData) ||
        isBTCAddress(lowerCaseData) ||
        isArkNote(lowerCaseData)
      ) {
        setClipboard(value)
      }
    })
  }, [])

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
    if (isArkAddress(lowerCaseData)) {
      const { aspKey } = decodeArkAddress(lowerCaseData)
      if (aspKey !== aspInfo.pubkey.slice(2)) return setError('Invalid ASP pubkey')
      return setDestination(lowerCaseData)
    }
    if (isBTCAddress(lowerCaseData)) {
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

  const handleFocus = () => {
    if (!amount) setShowKeys(true)
  }

  const handlePaste = () => {
    setAddress(clipboard)
    setClipboard('')
  }

  const balance = `${prettyNumber(wallet.balance)} sats available`

  return (
    <>
      {showKeys ? (
        <>
          <Header text='Amount' back={() => setShowKeys(false)} />
          <Content>
            <Padded>
              <Keyboard onChange={setAmount} />
            </Padded>
          </Content>
        </>
      ) : (
        <>
          <Header text='Send' />
          <Content>
            <Padded>
              <FlexCol gap='2rem'>
                <Error error={Boolean(error)} text={error} />
                <FlexCol gap='0.5rem'>
                  <InputAddress label='Recipient address' onChange={setAddress} value={address} />
                  {clipboard ? <Paste data={clipboard} onClick={handlePaste} /> : null}
                </FlexCol>
                <InputAmount
                  label='Amount'
                  onChange={setAmount}
                  onFocus={handleFocus}
                  right={balance}
                  value={satoshis}
                />
                <Button label='Open keyboard' onClick={() => setShowKeys(true)} />
              </FlexCol>
            </Padded>
          </Content>
          <ButtonsOnBottom>
            <Button onClick={handleContinue} label='Continue' disabled={disabled} />
          </ButtonsOnBottom>
        </>
      )}
    </>
  )
}
