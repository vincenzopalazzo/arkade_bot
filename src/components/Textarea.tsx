import { ReactNode } from 'react'
import Label from './Label'

interface TextareaProps {
  children?: ReactNode
  label?: string
  onChange?: (arg0: any) => void
  value?: string
}

export default function Textarea({ children, label, onChange, value }: TextareaProps) {
  const className =
    'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 text-lg rounded-lg w-full  p-2.5'

  const readOnly = typeof onChange === 'undefined'

  const rows = value ? Math.ceil(value.length / 30) : 2

  return (
    <div>
      {label ? <Label text={label} /> : null}
      <textarea className={className} onChange={onChange} readOnly={readOnly} rows={rows} value={value}>
        {children}
      </textarea>
    </div>
  )
}
