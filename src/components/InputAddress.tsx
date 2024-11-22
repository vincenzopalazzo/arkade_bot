import { IonIcon, IonInput, IonText } from '@ionic/react'
import { scanOutline } from 'ionicons/icons'
import InputContainer from './InputContainer'
import { useEffect, useState } from 'react'
import BarcodeScanner from './BarcodeScanner'
import ScanIcon from '../icons/Scan'

interface InputAddressProps {
  label?: string
  onChange: (arg0: any) => void
  placeholder?: string
  value?: string
}

export default function InputAddress({ label, onChange, placeholder, value }: InputAddressProps) {
  const [error, setError] = useState('')
  const [scan, setScan] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    if (value) setText(value)
  }, [value])

  useEffect(() => {
    onChange(text)
  }, [text])

  const handleInput = (ev: Event) => {
    setText((ev.target as HTMLInputElement).value)
  }

  const startScan = () => {
    setScan(true)
  }

  const handleData = (data: string) => {
    setText(data)
  }

  const handleError = (data: string) => {
    setScan(false)
    setError(data)
  }

  if (scan) return <BarcodeScanner setData={handleData} setError={handleError} />

  return (
    <InputContainer label={label} error={error}>
      <IonInput onIonInput={handleInput} placeholder={placeholder} value={value}>
        <IonText slot='end' style={{ color: 'var(--dark50)' }}>
          <div onClick={startScan}>
            <ScanIcon />
          </div>
        </IonText>
      </IonInput>
    </InputContainer>
  )
}
