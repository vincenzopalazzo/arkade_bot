import InputContainer from './InputContainer'
import { IonInput, IonInputPasswordToggle } from '@ionic/react'
import { StrengthLabel } from './Strength'

interface InputPasswordProps {
  label: string
  onChange: (arg0: any) => void
  strength?: number
}

export default function InputPassword({ label, onChange, strength }: InputPasswordProps) {
  const right = strength ? <StrengthLabel strength={strength} /> : undefined
  return (
    <InputContainer label={label} right={right}>
      <IonInput onIonInput={onChange} type='password'>
        <IonInputPasswordToggle slot='end' />
      </IonInput>
    </InputContainer>
  )
}
