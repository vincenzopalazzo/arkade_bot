import { IonButton } from '@ionic/react'
import { ReactElement } from 'react'

interface ButtonProps {
  clear?: boolean
  disabled?: boolean
  icon?: ReactElement
  label: string
  onClick: (event: any) => void
  red?: boolean
  secondary?: boolean
  short?: boolean
  small?: boolean
}

export default function Button({ clear, disabled, icon, label, onClick, red, secondary, short, small }: ButtonProps) {
  return (
    <IonButton
      color={red ? 'danger' : 'dark'}
      disabled={disabled}
      expand={short ? undefined : 'block'}
      fill={secondary ? 'outline' : clear ? 'clear' : 'solid'}
      onClick={onClick}
      size={small ? 'small' : 'default'}
    >
      {icon}
      {label}
    </IonButton>
  )
}
