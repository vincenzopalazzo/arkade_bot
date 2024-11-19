import { IonInput } from '@ionic/react'
import Label from './Label'

interface InputAmountProps {
  label?: string
  onChange: (arg0: any) => void
  placeholder?: string
}

export default function Input({ label, onChange, placeholder }: InputAmountProps) {
  const handleInput = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    onChange(value)
  }

  return (
    <div className='inputContainer'>
      {label ? <Label text={label} /> : null}
      <IonInput onIonInput={handleInput} placeholder={placeholder} />
    </div>
  )
}
