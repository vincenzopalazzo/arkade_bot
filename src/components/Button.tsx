import { IonButton } from '@ionic/react'
import { ReactElement } from 'react'

interface ButtonProps {
  disabled?: boolean
  icon?: ReactElement
  label: string
  onClick: (event: any) => void
  red?: boolean
  secondary?: boolean
  short?: boolean
}

export default function Button({ disabled, icon, label, onClick, red, secondary, short }: ButtonProps) {
  const style = {
    backgroundColor: red ? 'var(--redbg)' : undefined,
    color: red ? 'var(--red)' : undefined,
    marginTop: '1rem',
  }

  const xxx = (ev: any) => {
    console.log('ffff')
    onClick(ev)
  }

  return (
    <IonButton
      color={red ? 'danger' : 'dark'}
      disabled={disabled}
      expand={short ? undefined : 'block'}
      fill={secondary ? 'outline' : 'solid'}
      onClick={xxx}
      style={style}
    >
      {icon}
      {label}
    </IonButton>
  )
}
