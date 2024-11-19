import { ReactNode } from 'react'
import Label from './Label'
import Error from './Error'

interface InputContainerProps {
  children: ReactNode
  error?: string
  label?: string
}

export default function InputContainer({ children, error, label }: InputContainerProps) {
  return (
    <div className='inputContainer'>
      {label ? <Label text={label} /> : null}
      <div>{children}</div>
      <Error error={Boolean(error)} text={error ?? ''} />
    </div>
  )
}
