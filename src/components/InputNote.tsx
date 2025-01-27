import { isArkNote } from '../lib/arknote'
import InputWithScanner from './InputWithScanner'

interface InputNoteProps {
  label: string
  onChange: (arg0: any) => void
  openScan: () => void
}

export default function InputNote({ label, onChange, openScan }: InputNoteProps) {
  return <InputWithScanner focus label={label} onChange={onChange} openScan={openScan} validator={isArkNote} />
}
