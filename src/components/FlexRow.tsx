import { ReactNode } from 'react'

interface FlexRowProps {
  between?: boolean
  children: ReactNode
  gap?: string
  onClick?: () => void
}

export default function FlexRow({ between, children, gap, onClick }: FlexRowProps) {
  const justifyContent = between ? 'space-between' : 'start'
  const style = {
    alignItems: 'center',
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
