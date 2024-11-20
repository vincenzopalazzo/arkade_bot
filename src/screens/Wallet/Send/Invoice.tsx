import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import BarcodeScanner from '../../../components/BarcodeScanner'
import ShowError from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext, emptySendInfo } from '../../../providers/flow'
import Input from '../../../components/Input'
import Content from '../../../components/Content'
import Title from '../../../components/Title'
import Container from '../../../components/Container'
import { pasteFromClipboard } from '../../../lib/clipboard'
import { decodeArkAddress } from '../../../lib/address'
import { AspContext } from '../../../providers/asp'
import * as bip21 from '../../../lib/bip21'
import { ArkNote, isArkNote } from '../../../lib/arknote'

export default function SendInvoice() {
  const { aspInfo } = useContext(AspContext)
  const { navigate } = useContext(NavigationContext)
  const { setNoteInfo, setSendInfo } = useContext(FlowContext)

  const defaultLabel = 'Paste address or invoice'
  const [buttonLabel, setButtonLabel] = useState(defaultLabel)
  const [error, setError] = useState('')
  const [pastedData, setPastedData] = useState('')

  // Firefox doesn't support navigator.clipboard.readText()
  const firefox = !navigator.clipboard || !('readText' in navigator.clipboard)

  useEffect(() => {
    setError('')
    if (!pastedData) return
    const lowerCaseData = pastedData.toLowerCase()
    if (bip21.isBip21(lowerCaseData)) {
      const { address, amount, arkAddress } = bip21.decode(lowerCaseData)
      if (arkAddress) {
        setSendInfo({ arkAddress, satoshis: amount ?? 0 })
        return navigate(amount ? Pages.SendDetails : Pages.SendAmount)
      }
      if (address) {
        setSendInfo({ address, satoshis: amount ?? 0 })
        return navigate(amount ? Pages.SendDetails : Pages.SendAmount)
      }
      setError('Unable to parse bip21')
      return
    }
    if (/^t*ark1/.test(lowerCaseData)) {
      const { aspKey } = decodeArkAddress(lowerCaseData)
      var ourAspPubkey = aspInfo.pubkey
      if (aspInfo.pubkey.length === 66) {
        ourAspPubkey = aspInfo.pubkey.slice(2)
      }
      if (aspKey !== ourAspPubkey) {
        setError('Invalid ASP pubkey')
        return
      }
      setSendInfo({ arkAddress: lowerCaseData })
      return navigate(Pages.SendAmount)
    }
    if (/^bc1/.test(lowerCaseData) || /^tb1/.test(lowerCaseData)) {
      setSendInfo({ address: lowerCaseData })
      return navigate(Pages.SendAmount)
    }
    if (isArkNote(lowerCaseData)) {
      try {
        const anote = ArkNote.fromString(pastedData)
        setNoteInfo({ note: pastedData, satoshis: anote.data.value })
        return navigate(Pages.NoteRedeem)
      } catch (_) {}
    }
    setError('Invalid address or invoice')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastedData])

  const handlePaste = async () => {
    const pastedData = await pasteFromClipboard()
    setButtonLabel('Pasted')
    setTimeout(() => setButtonLabel(defaultLabel), 2100)
    setPastedData(pastedData)
  }

  const handleCancel = () => {
    setSendInfo(emptySendInfo)
    navigate(Pages.Wallet)
  }

  const handleChange = (invoice: string) => setPastedData(invoice)

  return (
    <Container>
      <Content>
        <Title text='Send' subtext='Scan or paste address' />
        <div className='flex flex-col gap-2'>
          <ShowError error={Boolean(error)} text={error} />
          {error ? null : (
            <>
              {firefox ? (
                <Input label='Paste your invoice here' left='&#9889;' onChange={handleChange} />
              ) : (
                <BarcodeScanner setPastedData={setPastedData} setError={setError} />
              )}
            </>
          )}
        </div>
      </Content>
      <ButtonsOnBottom>
        {!firefox && <Button onClick={handlePaste} label={buttonLabel} />}
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
