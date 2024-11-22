import { ReactNode } from 'react'

interface PaddedProps {
  children: ReactNode
}

export default function Padded({ children }: PaddedProps) {
  const style = {
    margin: '0.25rem 1rem',
  }
  return <div style={style}>{children}</div>
}
