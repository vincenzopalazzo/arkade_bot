import { ReactNode } from 'react'
import Label from './Label'
import Error from './Error'
import { IonCol, IonGrid, IonRow } from '@ionic/react'

interface InputContainerProps {
  children: ReactNode
  error?: string
  label?: string
  right?: string
}

export default function InputContainer({ children, error, label, right }: InputContainerProps) {
  const topLabel = () => (
    <IonGrid class='ion-no-padding' style={{ marginBottom: '8px' }}>
      <IonRow>
        <IonCol>
          <Label text={label ?? ''} />
        </IonCol>
        <IonCol class='ion-text-end'>
          <Label text={right ?? ''} />
        </IonCol>
      </IonRow>
    </IonGrid>
  )

  return (
    <div className='inputContainer'>
      {label || right ? topLabel() : null}
      <div>{children}</div>
      <Error error={Boolean(error)} text={error ?? ''} />
    </div>
  )
}
