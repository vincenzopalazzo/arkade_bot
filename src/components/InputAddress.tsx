import { IonInput, IonText } from '@ionic/react'
import InputContainer from './InputContainer'
import { useState } from 'react'
import BarcodeScanner from './BarcodeScanner'
import ScanIcon from '../icons/Scan'
import Clipboard from './Clipboard'
import { isArkAddress, isBTCAddress } from '../lib/address'
import { isArkNote } from '../lib/arknote'
import { isBip21 } from '../lib/bip21'
import FlexCol from './FlexCols'

interface InputAddressProps {
  label?: string
  onChange: (arg0: any) => void
  placeholder?: string
  value?: string
}

export default function InputAddress({ label, onChange, placeholder, value }: InputAddressProps) {
  const [error, setError] = useState('')
  const [scan, setScan] = useState(false)

  const handleInput = (ev: Event) => {
    onChange((ev.target as HTMLInputElement).value)
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

  const validator = (dataToValidate: string): boolean => {
    const data = dataToValidate.toLowerCase()
    return isBip21(data) || isArkAddress(data) || isBTCAddress(data) || isArkNote(data)
  }

  if (scan) return <BarcodeScanner setData={handleData} setError={handleError} />

  return (
    <FlexCol gap='0.5rem'>
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
    </FlexCol>
  )
}
