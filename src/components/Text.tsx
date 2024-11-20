import { IonText } from '@ionic/react'
import { ReactNode } from 'react'

interface ButtonsOnBottomProps {
  capitalize?: boolean
  children: ReactNode
  emphasys?: boolean
  green?: boolean
  minititle?: boolean
  secondary?: boolean
}

export default function Text({ capitalize, children, emphasys, green, minititle, secondary }: ButtonsOnBottomProps) {
  let style: any = {}
  if (secondary) style = { ...style, color: '#666' }
  if (minititle) style = { ...style, fontSize: '12px', lineHeight: '18px' }
  if (emphasys) style = { ...style, fontSize: '28px', lineHeight: '42px' }
  if (capitalize) style = { ...style, textTransform: 'capitalize' }
  const color = green ? 'success' : ''
  return (
    <IonText color={color}>
      <p style={style}>{children}</p>
    </IonText>
  )
}
