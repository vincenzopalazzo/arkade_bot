import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import BarcodeScanner from '../../../components/BarcodeScanner'
import Error from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext } from '../../../providers/flow'
import Padded from '../../../components/Padded'
import Content from '../../../components/Content'
import { ArkNote, isArkNote } from '../../../lib/arknote'
import { ConfigContext } from '../../../providers/config'
import Header from '../../Settings/Header'
import InputNote from '../../../components/InputNote'

export default function NotesForm() {
  const { showConfig, toggleShowConfig } = useContext(ConfigContext)
  const { navigate } = useContext(NavigationContext)
  const { setNoteInfo } = useContext(FlowContext)

  const [error, setError] = useState('')
  const [note, setNote] = useState('')
  const [showScan, setShowScan] = useState(false)

  useEffect(() => {
    setError('')
    if (!note) return
    if (isArkNote(note)) {
      try {
        const decoded = ArkNote.fromString(note)
        setNoteInfo({ note, satoshis: decoded.data.value })
        if (showConfig) toggleShowConfig()
        return navigate(Pages.NotesRedeem)
      } catch (_) {}
    }
    setError('Invalid note')
  }, [note])

  const handleContinue = () => {
    navigate(Pages.NotesRedeem)
  }

  return showScan ? (
    <>
      <Header text='Note' back />
      <Content>
        <BarcodeScanner setData={setNote} setError={setError} />
      </Content>
      <ButtonsOnBottom>
        <Button onClick={() => setShowScan(false)} label='Cancel scan' />
      </ButtonsOnBottom>
    </>
  ) : (
    <>
      <Header text='Note' back />
      <Content>
        <Padded>
          <InputNote label='Ark note' onChange={setNote} />
          <Error error={Boolean(error)} text={error} />
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleContinue} label='Continue' />
      </ButtonsOnBottom>
    </>
  )
}
