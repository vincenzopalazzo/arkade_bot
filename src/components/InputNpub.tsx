import InputWithScanner from './InputWithScanner'

interface InputNpubProps {
  label: string
  onChange: (arg0: any) => void
  openScan: () => void
  placeholder?: string
  value: string
}

export default function InputNpub({ label, onChange, openScan, placeholder, value }: InputNpubProps) {
  const isNpub = (data: string): boolean => {
    return /^npub/.test(data.toLowerCase())
  }

  return (
    <InputWithScanner
      label={label}
      onChange={onChange}
      openScan={openScan}
      placeholder={placeholder}
      validator={isNpub}
      value={value}
    />
  )
}
