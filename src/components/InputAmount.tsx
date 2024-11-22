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
  const [text, setText] = useState('')

  useEffect(() => {
    if (value) setText(value.toString())
  }, [value])

  useEffect(() => {
    const sats = Math.floor(Number(text))
    setFiatValue(prettyNumber(toUSD(sats), 2))
    setError(sats < 0 ? 'Invalid amount' : '')
    onChange(sats)
  }, [text])

  const handleInput = (ev: Event) => {
    setText((ev.target as HTMLInputElement).value)
  }

  return (
    <>
      <InputContainer error={error} label={label} right={right}>
        <IonInput onIonFocus={onFocus} onIonInput={handleInput} type='number' value={value}>
          <IonText slot='end' style={{ color: 'var(--dark50)', fontSize: '13px' }}>{`$${fiatValue}`}</IonText>
        </IonInput>
      </InputContainer>
    </>
  )
}
