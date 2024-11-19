import { IonText } from '@ionic/react'
import { ReactNode } from 'react'

interface ButtonsOnBottomProps {
  children: ReactNode
  emphasys?: boolean
  green?: boolean
  minititle?: boolean
  secondary?: boolean
}

export default function Text({ children, emphasys, green, minititle, secondary }: ButtonsOnBottomProps) {
  const className =
    'text text-' + (secondary ? 'secondary' : minititle ? 'minititle' : emphasys ? 'emphasys' : 'normal')
  const color = green ? 'success' : ''
  return (
    <IonText color={color}>
      <p className={className}>{children}</p>
    </IonText>
  )
}
