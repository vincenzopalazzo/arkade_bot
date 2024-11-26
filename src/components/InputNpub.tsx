import FlexCol from './FlexCols'
import InputContainer from './InputContainer'
import Clipboard from './Clipboard'
import { IonInput } from '@ionic/react'

interface InputNpubProps {
  label: string
  onChange: (arg0: any) => void
  value: string
}

export default function InputNpub({ label, onChange, value }: InputNpubProps) {
  const handleInput = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    onChange(value)
  }

  const isNpub = (dataToValidate: string): boolean => {
    const data = dataToValidate.toLowerCase()
    return /^npub/.test(data)
  }

  return (
    <FlexCol gap='0.5rem'>
      <InputContainer label={label}>
        <IonInput onIonInput={handleInput} value={value} />
      </InputContainer>
      <Clipboard onPaste={onChange} validator={isNpub} />
    </FlexCol>
  )
}
