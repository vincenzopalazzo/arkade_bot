import { ReactNode } from 'react'

interface ShadowProps {
  children: ReactNode
  flex?: boolean
  lighter?: boolean
  onClick?: () => void
  red?: boolean
  squared?: boolean
}

export default function Shadow({ children, flex, lighter, onClick, red, squared }: ShadowProps) {
  const style = {
    backgroundColor: red ? 'var(--red)' : lighter ? 'var(--dark05)' : 'var(--dark10)',
    borderRadius: squared ? undefined : '0.5rem',
    cursor: onClick ? 'pointer' : undefined,
    padding: '0.5rem',
    width: flex ? undefined : '100%',
  }

  return (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  )
}
