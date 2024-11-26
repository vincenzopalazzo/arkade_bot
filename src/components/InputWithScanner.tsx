import { IonInput, IonText } from '@ionic/react'
import InputContainer from './InputContainer'
import ScanIcon from '../icons/Scan'
import Clipboard from './Clipboard'
import FlexCol from './FlexCol'

interface InputWithScannerProps {
  error?: string
  label?: string
  onChange: (arg0: any) => void
  openScan: () => void
  placeholder?: string
  validator?: (arg0: string) => boolean
  value?: string
}

export default function InputWithScanner({
  error,
  label,
  onChange,
  openScan,
  placeholder,
  validator,
  value,
}: InputWithScannerProps) {
  const handleInput = (ev: Event) => {
    onChange((ev.target as HTMLInputElement).value)
  }

  return (
    <FlexCol gap='0.5rem'>
      <InputContainer label={label} error={error}>
        <IonInput onIonInput={handleInput} placeholder={placeholder} value={value}>
          <IonText slot='end' style={{ color: 'var(--dark50)' }}>
            <div onClick={openScan}>
              <ScanIcon />
            </div>
          </IonText>
        </IonInput>
      </InputContainer>
      <Clipboard onPaste={onChange} validator={validator} />
    </FlexCol>
  )
}
