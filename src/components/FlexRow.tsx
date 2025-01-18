import { ReactNode } from 'react'

interface FlexRowProps {
  alignItems?: string
  between?: boolean
  children: ReactNode
  gap?: string
  onClick?: () => void
}

export default function FlexRow({ alignItems, between, children, gap, onClick }: FlexRowProps) {
  const justifyContent = between ? 'space-between' : 'start'
  const style = {
    alignItems: alignItems ?? 'center',
    cursor: onClick ? 'pointer' : 'inherit',
    display: 'flex',
    gap: gap ?? '.5rem',
    justifyContent,
    width: '100%',
  }
  return (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  )
}
