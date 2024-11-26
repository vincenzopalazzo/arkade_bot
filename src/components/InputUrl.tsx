import InputWithScanner from './InputWithScanner'

interface InputUrlProps {
  label?: string
  onChange: (arg0: any) => void
  openScan: () => void
  placeholder?: string
  value?: string
}

export default function InputUrl({ label, onChange, openScan, placeholder, value }: InputUrlProps) {
  const isUrl = (data: string): boolean => {
    return /^https?:/.test(data.toLowerCase())
  }

  return (
    <InputWithScanner
      label={label}
      onChange={onChange}
      openScan={openScan}
      placeholder={placeholder}
      validator={isUrl}
      value={value}
    />
  )
}
