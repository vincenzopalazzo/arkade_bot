import { ReactNode } from 'react'

interface CenterScreenProps {
  children: ReactNode
}

export default function CenterScreen({ children }: CenterScreenProps) {
  const style: any = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    height: '100%',
    justifyContent: 'center',
    paddingBottom: '5rem',
    width: '100%',
  }

  return <div style={style}>{children}</div>
}
