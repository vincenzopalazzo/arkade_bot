import { IonInput, IonText } from '@ionic/react'
import InputContainer from './InputContainer'
import { useState } from 'react'
import BarcodeScanner from './BarcodeScanner'
import ScanIcon from '../icons/Scan'
import Clipboard from './Clipboard'

interface InputUrlProps {
  label?: string
  onChange: (arg0: any) => void
  placeholder?: string
  value?: string
}

export default function InputUrl({ label, onChange, placeholder, value }: InputUrlProps) {
  const [error, setError] = useState('')
  const [scan, setScan] = useState(false)

  const isUrl = new RegExp('^https?://')

  const handleInput = (ev: Event) => {
    const data = (ev.target as HTMLInputElement).value.toLowerCase()
    if (isUrl.test(data)) onChange(data)
  }

  const startScan = () => {
    setScan(true)
  }

  const handleData = (data: string) => {
    onChange(data)
  }

  const handleError = (data: string) => {
    setScan(false)
    setError(data)
  }

  const validator = (data: string): boolean => {
    return isUrl.test(data.toLowerCase())
  }

  if (scan) return <BarcodeScanner setData={handleData} setError={handleError} />

  return (
    <>
      <InputContainer label={label} error={error}>
        <IonInput onIonInput={handleInput} placeholder={placeholder} value={value}>
          <IonText slot='end' style={{ color: 'var(--dark50)' }}>
            <div onClick={startScan}>
              <ScanIcon />
            </div>
          </IonText>
        </IonInput>
      </InputContainer>
      <Clipboard onPaste={onChange} validator={validator} />
    </>
  )
}
