import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import BarcodeScanner from '../../../components/BarcodeScanner'
import ShowError from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import Input from '../../../components/Input'
import Content from '../../../components/Content'
import Container from '../../../components/Container'
import { pasteFromClipboard } from '../../../lib/clipboard'
import { ArkNote, isArkNote } from '../../../lib/arknote'
import { ConfigContext } from '../../../providers/config'
import Header from '../../Settings/Header'

export default function NoteScan() {
  const { showConfig, toggleShowConfig } = useContext(ConfigContext)
  const { navigate } = useContext(NavigationContext)
  const { setNoteInfo } = useContext(FlowContext)

  const defaultLabel = 'Paste note'
  const [buttonLabel, setButtonLabel] = useState(defaultLabel)
  const [error, setError] = useState('')
  const [pastedData, setPastedData] = useState('')

  // Firefox doesn't support navigator.clipboard.readText()
  const firefox = !navigator.clipboard || !('readText' in navigator.clipboard)

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

  const handleChange = (invoice: string) => setPastedData(invoice)

  return (
    <Container>
      <Header text='Note' back />
      <Content>
        <div className='flex flex-col gap-2'>
          <ShowError error={Boolean(error)} text={error} />
          {error ? null : (
            <>
              {firefox ? (
                <Input label='Paste your note here' onChange={handleChange} />
              ) : (
                <BarcodeScanner setData={setPastedData} setError={setError} />
              )}
            </>
          )}
        </div>
      </Content>
      <ButtonsOnBottom>{!firefox && <Button onClick={handlePaste} label={buttonLabel} />}</ButtonsOnBottom>
    </Container>
  )
}
