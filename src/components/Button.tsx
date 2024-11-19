import { IonButton } from '@ionic/react'
import { ReactElement } from 'react'

interface ButtonProps {
  disabled?: boolean
  icon?: ReactElement
  label: string
  onClick: (event: any) => void
  secondary?: boolean
}

export default function Button({ disabled, icon, label, onClick, secondary }: ButtonProps) {
  return (
    <IonButton color='dark' disabled={disabled} expand='block' fill={secondary ? 'outline' : 'solid'} onClick={onClick}>
      {icon}
      {label}
    </IonButton>
  )
}
