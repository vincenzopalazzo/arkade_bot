import { IonCheckbox } from '@ionic/react'
import FlexRow from './FlexRow'
import { TextSecondary } from './Text'

interface CheckboxProps {
  onChange: () => void
  text: string
}

export default function Checkbox({ onChange, text }: CheckboxProps) {
  const style = {
    border: '1px solid var(--dark50)',
    borderRadius: '0.5rem',
    padding: '1rem',
    width: '100%',
  }
  return (
    <div style={style}>
      <FlexRow>
        <IonCheckbox onIonChange={onChange} />
        <TextSecondary>{text}</TextSecondary>
      </FlexRow>
    </div>
  )
}
