import { ReactNode } from 'react'

interface ShadowProps {
  children: ReactNode
  light?: boolean
  onClick?: () => void
  red?: boolean
}

export default function Shadow({ children, light, onClick, red }: ShadowProps) {
  const style = {
    backgroundColor: red ? '#FF4F4F' : light ? '#FBFBFB33' : '#FBFBFB1A',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    width: '100%',
  }

  return (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  )
}
