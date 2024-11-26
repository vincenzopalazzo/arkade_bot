import FlexCol from './FlexCol'
import InputContainer from './InputContainer'
import Clipboard from './Clipboard'
import { IonInput } from '@ionic/react'
import { isArkNote } from '../lib/arknote'

interface InputNoteProps {
  label: string
  onChange: (arg0: any) => void
}

export default function InputNote({ label, onChange }: InputNoteProps) {
  const handleInput = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    onChange(value)
  }

  return (
    <FlexCol gap='0.5rem'>
      <InputContainer label={label}>
        <IonInput onIonInput={handleInput} />
      </InputContainer>
      <Clipboard onPaste={onChange} validator={isArkNote} />
    </FlexCol>
  )
}
