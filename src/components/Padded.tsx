import { ReactNode } from 'react'

interface PaddedProps {
  children: ReactNode
}

export default function Padded({ children }: PaddedProps) {
  const style = {
    padding: '0.25rem 1rem',
    width: '100%',
  }
  return <div style={style}>{children}</div>
}
