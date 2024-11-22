import { IonText } from '@ionic/react'
import { ReactNode } from 'react'

const fontSizesAndLineHeight: any = {
  tiny: ['12px', '18px'],
  smaller: ['13px', '20px'],
  small: ['14px', '21px'],
  normal: ['16px', '24px'],
  large: ['28px', '42px'],
}

interface TextProps {
  bold?: boolean
  capitalize?: boolean
  centered?: boolean
  children: ReactNode
  color?: string
  size?: string
  wrap?: boolean
}

export default function Text({ bold, capitalize, centered, color, children, size, wrap }: TextProps) {
  const fkey = size && Object.keys(fontSizesAndLineHeight).includes(size) ? size : 'normal'

  const style: any = {
    color: `var(--${color})`,
    fontSize: fontSizesAndLineHeight[fkey][0],
    fontWeight: bold ? '600' : undefined,
    lineHeight: fontSizesAndLineHeight[fkey][1],
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

export function TextEmphasys({ children }: TextProps) {
  return (
    <Text size='large' capitalize>
      {children}
    </Text>
  )
}

export function TextGreen({ children }: TextProps) {
  return <Text color='green'>{children}</Text>
}

export function TextLabel({ children }: TextProps) {
  return (
    <div style={{ padding: '0 1rem', marginBottom: '0.5rem' }}>
      <Text capitalize color='dark50' size='smaller'>
        {children}
      </Text>
    </div>
  )
}

export function TextMini({ children }: TextProps) {
  return (
    <Text size='tiny' color='dark80' capitalize>
      {children}
    </Text>
  )
}

export function TextNormal({ children, color }: TextProps) {
  return <Text color={color}>{children}</Text>
}

export function TextSecondary({ children, wrap }: TextProps) {
  return (
    <Text color='dark50' size='small' wrap={wrap}>
      {children}
    </Text>
  )
}
