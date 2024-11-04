import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import BarcodeScanner from '../../../components/BarcodeScanner'
import ShowError from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext, emptyNoteInfo } from '../../../providers/flow'
import Input from '../../../components/Input'
import Content from '../../../components/Content'
import Title from '../../../components/Title'
import Container from '../../../components/Container'
import { pasteFromClipboard } from '../../../lib/clipboard'
import { ArkNote, isArkNote } from '../../../lib/arknote'
import { ConfigContext } from '../../../providers/config'

export default function NoteScan() {
  const { showConfig, toggleShowConfig } = useContext(ConfigContext)
  const { navigate } = useContext(NavigationContext)
  const { setNoteInfo } = useContext(FlowContext)

  const defaultLabel = 'Paste note'
  const [buttonLabel, setButtonLabel] = useState(defaultLabel)
  const [cameraAllowed, setCameraAllowed] = useState(false)
  const [error, setError] = useState('')
  const [pastedData, setPastedData] = useState('')

  // Firefox doesn't support navigator.clipboard.readText()
  const firefox = !navigator.clipboard || !('readText' in navigator.clipboard)

  useEffect(() => {
    navigator.permissions
      .query({ name: 'camera' as PermissionName })
      .then((x) => {
        if (x.state !== 'denied') setCameraAllowed(true)
      })
      .catch()
  })

  useEffect(() => {
    setError('')
    if (!pastedData) return
    if (isArkNote(pastedData)) {
      try {
        const note = ArkNote.fromString(pastedData)
        setNoteInfo({ note: pastedData, satoshis: note.data.value })
        if (showConfig) toggleShowConfig()
        return navigate(Pages.NoteRedeem)
      } catch (_) {}
    }
    setError('Invalid note')
  }, [pastedData])

  const handlePaste = async () => {
    const pastedData = await pasteFromClipboard()
    setButtonLabel('Pasted')
    setTimeout(() => setButtonLabel(defaultLabel), 2100)
    setPastedData(pastedData)
  }

  const handleCancel = () => {
    setNoteInfo(emptyNoteInfo)
    if (showConfig) toggleShowConfig()
    else navigate(Pages.Wallet)
  }

  const handleChange = (invoice: string) => setPastedData(invoice)

  return (
    <Container>
      <Content>
        <Title text='Voucher' subtext='Scan or paste voucher' />
        <div className='flex flex-col gap-2'>
          <ShowError error={Boolean(error)} text={error} />
          {error ? null : (
            <>
              {firefox ? (
                <Input label='Paste your invoice here' left='&#9889;' onChange={handleChange} />
              ) : cameraAllowed ? (
                <BarcodeScanner setPastedData={setPastedData} setError={setError} />
              ) : null}
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
