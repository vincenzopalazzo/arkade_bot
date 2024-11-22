import InputContainer from './InputContainer'
import { IonInput, IonInputPasswordToggle } from '@ionic/react'

interface InputPasswordProps {
  label: string
  onChange: (arg0: any) => void
}

export default function InputPassword({ label, onChange }: InputPasswordProps) {
  return (
    <InputContainer label={label}>
      <IonInput onIonInput={onChange} type='password'>
        <IonInputPasswordToggle slot='end' />
      </IonInput>
    </InputContainer>
  )
}
