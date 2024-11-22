import { IonInput } from '@ionic/react'
import { TextLabel } from './Text'

interface InputAmountProps {
  label?: string
  onChange: (arg0: any) => void
  placeholder?: string
  value?: string
}

export default function Input({ label, onChange, placeholder, value }: InputAmountProps) {
  const handleInput = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    onChange(value)
  }

  return (
    <>
      {label ? <TextLabel>{label}</TextLabel> : null}
      <IonInput onIonInput={handleInput} placeholder={placeholder} value={value} />
    </>
  )
}
