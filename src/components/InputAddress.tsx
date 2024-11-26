import { isArkAddress, isBTCAddress } from '../lib/address'
import { isArkNote } from '../lib/arknote'
import { isBip21 } from '../lib/bip21'
import InputWithScanner from './InputWithScanner'

interface InputAddressProps {
  label?: string
  onChange: (arg0: any) => void
  openScan: () => void
  placeholder?: string
  value?: string
}

export default function InputAddress({ label, onChange, openScan, placeholder, value }: InputAddressProps) {
  const isAddress = (data: string): boolean => {
    return (
      isBip21(data.toLowerCase()) ||
      isArkAddress(data.toLowerCase()) ||
      isBTCAddress(data.toLowerCase()) ||
      isArkNote(data) // easter egg :)
    )
  }

  return (
    <InputWithScanner
      label={label}
      onChange={onChange}
      openScan={openScan}
      placeholder={placeholder}
      validator={isAddress}
      value={value}
    />
  )
}
