import { ReactNode } from 'react'

interface ShadowProps {
  children: ReactNode
  lighter?: boolean
  onClick?: () => void
  red?: boolean
  squared?: boolean
}

export default function Shadow({ children, lighter, onClick, red, squared }: ShadowProps) {
  const style = {
    backgroundColor: red ? 'var(--red)' : lighter ? 'var(--dark05)' : 'var(--dark10)',
    borderRadius: squared ? undefined : '0.5rem',
    cursor: onClick ? 'pointer' : undefined,
    padding: '0.5rem 0',
    width: '100%',
  }

  return (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  )
}
