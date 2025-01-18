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
import FlexCol from '../../../components/FlexCol'
import Keyboard from '../../../components/Keyboard'
import Text from '../../../components/Text'
import Scanner from '../../../components/Scanner'
import { consoleError } from '../../../lib/logs'

export default function SendForm() {
  const { aspInfo } = useContext(AspContext)
  const { navigate } = useContext(NavigationContext)
  const { sendInfo, setNoteInfo, setSendInfo } = useContext(FlowContext)
  const { wallet } = useContext(WalletContext)

  const [error, setError] = useState('')
  const [label, setLabel] = useState('')
  const [keys, setKeys] = useState(false)
  const [scan, setScan] = useState(false)

  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState('')

  useEffect(() => {
    const { recipient, satoshis } = sendInfo
    setRecipient(recipient ?? '')
    setAmount(satoshis ?? 0)
  }, [])

  useEffect(() => {
    smartSetError('')
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
      if (aspKey !== aspInfo.pubkey.slice(2)) return setError('Invalid Ark server pubkey')
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
      } catch (err) {
        consoleError('error parsing ark note', err)
      }
    }
    setError('Invalid recipient address')
  }, [recipient])

  useEffect(() => {
    setSendInfo({ ...sendInfo, satoshis: amount })
  }, [amount])

  useEffect(() => {
    setError(aspInfo.unreachable ? 'Ark server unreachable' : '')
    setLabel(aspInfo.unreachable ? 'Server unreachable' : 'Continue')
  }, [aspInfo.unreachable])

  const handleContinue = () => {
    setSendInfo({ ...sendInfo, satoshis: amount })
    navigate(Pages.SendDetails)
  }

  const handleFocus = () => {
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints
    if (isMobile) setKeys(true)
  }

  const smartSetError = (str: string) => {
    setError(str === '' ? (aspInfo.unreachable ? 'Ark server unreachable' : '') : str)
  }

  const Available = () => (
    <Text color='dark50' smaller>
      {`${prettyNumber(wallet.balance)} sats available`}
    </Text>
  )

  const { address, arkAddress, satoshis } = sendInfo
  const disabled = !((address || arkAddress) && satoshis && satoshis > 0) || aspInfo.unreachable

  if (scan)
    return (
      <Scanner close={() => setScan(false)} label='Recipient address' setData={setRecipient} setError={smartSetError} />
    )

  if (keys) return <Keyboard back={() => setKeys(false)} onChange={setAmount} value={amount} />

  return (
    <>
      <Header text='Send' />
      <Content>
        <Padded>
          <FlexCol gap='2rem'>
            <Error error={Boolean(error)} text={error} />
            <InputAddress
              label='Recipient address'
              onChange={setRecipient}
              openScan={() => setScan(true)}
              value={recipient}
            />
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
        <Button onClick={handleContinue} label={label} disabled={disabled} />
      </ButtonsOnBottom>
    </>
  )
}
