import { ReactNode } from 'react'

interface CenterScreenProps {
  children: ReactNode
  gap?: string
}

export default function CenterScreen({ children, gap }: CenterScreenProps) {
  const style: any = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: gap ?? '1rem',
    height: '100%',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: '16rem',
    paddingBottom: '5rem',
  }

  return <div style={style}>{children}</div>
}
