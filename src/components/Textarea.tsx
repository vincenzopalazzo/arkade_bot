import { ReactNode } from 'react'
import Text from './Text'
import { IonTextarea } from '@ionic/react'
import Padded from './Padded'
import Shadow from './Shadow'
import FlexCol from './flexCol'

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
    <FlexCol gap='0.5rem'>
      {label ? (
        <Text color='dark50' small>
          {label}
        </Text>
      ) : null}
      <Shadow>
        <IonTextarea onChange={onChange} readonly={typeof onChange === 'undefined'} style={style} value={value}>
          {children}
        </IonTextarea>
      </Shadow>
    </FlexCol>
  )
}
