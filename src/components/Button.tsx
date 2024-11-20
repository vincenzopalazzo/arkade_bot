import { IonButton } from '@ionic/react'
import { ReactElement } from 'react'

interface ButtonProps {
  disabled?: boolean
  icon?: ReactElement
  label: string
  onClick: (event: any) => void
  secondary?: boolean
  short?: boolean
}

export default function Button({ disabled, icon, label, onClick, secondary, short }: ButtonProps) {
  return (
    <IonButton
      color='dark'
      disabled={disabled}
      expand={short ? undefined : 'block'}
      fill={secondary ? 'outline' : 'solid'}
      onClick={onClick}
    >
      {icon}
      {label}
    </IonButton>
  )
}
