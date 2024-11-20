import { ReactNode } from 'react'

interface FlexRowProps {
  children: ReactNode
  onClick?: () => void
}

export default function FlexRow({ children, onClick }: FlexRowProps) {
  const style = {
    alignItems: 'center',
    display: 'flex',
    gap: '.5rem',
  }
  return (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  )
}
