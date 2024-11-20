import { ReactNode } from 'react'

interface FlexColProps {
  children: ReactNode
  gap?: string
}

export default function FlexCol({ children, gap }: FlexColProps) {
  const style = gap ? { gap } : {}
  return (
    <div className='flexCol' style={style}>
      {children}
    </div>
  )
}
