import { IonText } from '@ionic/react'
import { ReactNode } from 'react'

interface TextProps {
  bold?: boolean
  capitalize?: boolean
  centered?: boolean
  children: ReactNode
  color?: string
  wrap?: boolean
  tiny?: boolean
  smaller?: boolean
  small?: boolean
  big?: boolean
  bigger?: boolean
  dark50?: boolean
  dark80?: boolean
  green?: boolean
  red?: boolean
  white?: boolean
}

export default function Text({
  bold,
  capitalize,
  centered,
  color,
  children,
  wrap,
  tiny,
  smaller,
  small,
  big,
  bigger,
}: TextProps) {
  const fontSize = tiny ? 12 : smaller ? 13 : small ? 14 : big ? 24 : bigger ? 28 : 16

  const style: any = {
    color: `var(--${color})`,
    fontSize,
    fontWeight: bold ? '600' : undefined,
    lineHeight: '1.5',
    overflow: wrap ? undefined : 'hidden',
    textAlign: centered ? 'center' : undefined,
    textOverflow: wrap ? undefined : 'ellipsis',
    textTransform: capitalize ? 'capitalize' : undefined,
    whiteSpace: wrap ? undefined : 'nowrap',
  }

  return (
    <IonText>
      <p style={style}>{children}</p>
    </IonText>
  )
}

export function TextLabel({ children }: TextProps) {
  return (
    <div style={{ padding: '0 1rem', marginBottom: '0.5rem' }}>
      <Text capitalize color='dark50' smaller>
        {children}
      </Text>
    </div>
  )
}

export function TextSecondary({ centered, children, wrap }: TextProps) {
  return (
    <Text centered={centered} color='dark50' small wrap={wrap}>
      {children}
    </Text>
  )
}
