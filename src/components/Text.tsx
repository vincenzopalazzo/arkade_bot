import { IonText } from '@ionic/react'
import { ReactNode } from 'react'

const fontSizesAndLineHeight: any = {
  tiny: ['12px', '18px'],
  smaller: ['13px', '20px'],
  small: ['14px', '21px'],
  normal: ['16px', '24px'],
  large: ['28px', '42px'],
}

const fontColors: any = {
  red: '#FF4F4F',
  green: '#34C759',
  white100: '#FBFBFBFF',
  white80: '#FBFBFBB2',
  white50: '#FBFBFB80',
  white20: '#FBFBFB33',
  white10: '#FBFBFB1A',
}

interface TextProps {
  capitalize?: boolean
  centered?: boolean
  children: ReactNode
  color?: string
  green?: boolean
  size?: string
  truncate?: boolean
}

export default function Text({ capitalize, centered, color, children, green, size, truncate }: TextProps) {
  const fkey = size && Object.keys(fontSizesAndLineHeight).includes(size) ? size : 'normal'
  const ckey = color && Object.keys(fontColors).includes(color) ? color : 'white100'

  const style: any = {
    color: fontColors[ckey],
    fontSize: fontSizesAndLineHeight[fkey][0],
    lineHeight: fontSizesAndLineHeight[fkey][1],
    overflow: truncate ? 'hidden' : undefined,
    textAlign: centered ? 'center' : undefined,
    textOverflow: truncate ? 'ellipsis' : undefined,
    textTransform: capitalize ? 'capitalize' : undefined,
    whiteSpace: truncate ? 'nowrap' : undefined,
  }

  return (
    <IonText color={green ? 'success' : ''}>
      <p style={style}>{children}</p>
    </IonText>
  )
}

export function TextEmphasys({ children }: { children: ReactNode }) {
  return (
    <Text size='large' color='white100' capitalize>
      {children}
    </Text>
  )
}

export function TextGreen({ children }: { children: ReactNode }) {
  return <Text color='green'>{children}</Text>
}

export function TextLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: '0 1rem', marginBottom: '0.5rem' }}>
      <Text capitalize color='white50' size='smaller'>
        {children}
      </Text>
    </div>
  )
}

export function TextMini({ children }: { children: ReactNode }) {
  return (
    <Text size='tiny' color='white80' capitalize>
      {children}
    </Text>
  )
}

export function TextNormal({ children }: { children: ReactNode }) {
  return <Text>{children}</Text>
}

export function TextSecondary({ children, truncate }: { children: ReactNode; truncate?: boolean }) {
  return (
    <Text color='white50' size='small' truncate={truncate}>
      {children}
    </Text>
  )
}
