import { ReactNode } from 'react'

interface ButtonsOnBottomProps {
  children: ReactNode
}

export default function ButtonsOnBottom({ children }: ButtonsOnBottomProps) {
  return <div className='flex flex-col gap-2 mb-4 w-full'>{children}</div>
}
