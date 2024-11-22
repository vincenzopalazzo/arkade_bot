import InputContainer from './InputContainer'
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

  return (
    <InputContainer label={label}>
      <IonInput onIonInput={handleInput} value={value} />
    </InputContainer>
  )
}
