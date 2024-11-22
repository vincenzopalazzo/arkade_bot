import { ReactNode } from 'react'
import { TextLabel } from './Text'
import { IonTextarea } from '@ionic/react'
import Padded from './Padded'
import Shadow from './Shadow'

interface TextareaProps {
  children?: ReactNode
  label?: string
  onChange?: (arg0: any) => void
  value?: string
}

export default function Textarea({ children, label, onChange, value }: TextareaProps) {
  const style = {
    padding: '0.5rem 1rem',
  }

  return (
    <>
      {label ? <TextLabel>{label}</TextLabel> : null}
      <Padded>
        <Shadow>
          <IonTextarea onChange={onChange} readonly={typeof onChange === 'undefined'} style={style} value={value}>
            {children}
          </IonTextarea>
        </Shadow>
      </Padded>
    </>
  )
}
