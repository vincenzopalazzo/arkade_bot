import { ReactNode } from 'react'

interface PaddedProps {
  children: ReactNode
}

export default function Padded({ children }: PaddedProps) {
  const style = {
    margin: '1rem',
  }
  return <div style={style}>{children}</div>
}
