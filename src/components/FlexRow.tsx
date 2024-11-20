import { ReactNode } from 'react'

interface FlexRowProps {
  children: ReactNode
}

export default function FlexRow({ children }: FlexRowProps) {
  return <div className='flexRow'>{children}</div>
}
