import { ReactNode } from 'react'

interface FlexColProps {
  children: ReactNode
  end?: boolean
  gap?: string
}

export default function FlexCol({ children, end, gap }: FlexColProps) {
  const style: any = {
    alignItems: end ? 'end' : 'start',
    display: 'flex',
    flexDirection: 'column',
    gap: gap ?? '1rem',
    width: '100%',
  }

  return <div style={style}>{children}</div>
}
