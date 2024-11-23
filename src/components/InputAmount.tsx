import { useContext, useEffect, useState } from 'react'
import { IonInput, IonText } from '@ionic/react'
import { FiatContext } from '../providers/fiat'
import { prettyNumber } from '../lib/format'
import InputContainer from './InputContainer'

interface InputAmountProps {
  label?: string
  onChange: (arg0: any) => void
  onFocus?: () => void
  right?: string
  value?: number
}

export default function InputAmount({ label, onChange, onFocus, right, value }: InputAmountProps) {
  const { toUSD } = useContext(FiatContext)

  const [error, setError] = useState('')
  const [fiatValue, setFiatValue] = useState('')

  useEffect(() => {
    setFiatValue(prettyNumber(toUSD(value ?? 0), 2))
    setError(value ? (value < 0 ? 'Invalid amount' : '') : '')
  }, [value])

  const handleInput = (ev: Event) => {
    const newValue = Number((ev.target as HTMLInputElement).value)
    if (Number.isNaN(newValue)) return
    onChange(newValue)
  }

  return (
    <>
      <InputContainer error={error} label={label} right={right}>
        <IonInput onIonFocus={onFocus} onIonInput={handleInput} type='number' value={value ? value : undefined}>
          <IonText slot='end' style={{ color: 'var(--dark50)', fontSize: '13px' }}>{`$${fiatValue}`}</IonText>
        </IonInput>
      </InputContainer>
    </>
  )
}
