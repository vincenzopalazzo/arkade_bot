import { IonCol, IonGrid, IonRow } from '@ionic/react'
import Header from './Header'
import Content from './Content'
import { useContext, useEffect, useState } from 'react'
import { TextEmphasys, TextSecondary } from './Text'
import { FiatContext } from '../providers/fiat'
import { prettyNumber } from '../lib/format'
import { WalletContext } from '../providers/wallet'
import { defaultFee } from '../lib/constants'
import Error from './Error'

interface KeyboardProps {
  back: () => void
  onChange: (arg0: number) => void
}

export default function Keyboard({ back, onChange }: KeyboardProps) {
  const { toUSD } = useContext(FiatContext)
  const { wallet } = useContext(WalletContext)

  const [amount, setAmount] = useState('')
  const [fiatValue, setFiatValue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!amount) return
    try {
      const sats = parseFloat(amount)
      setFiatValue(prettyNumber(toUSD(sats), 2))
      onChange(sats)
    } catch {
      setError('Invalid amount')
    }
  }, [amount])

  const amountWithSats = () => {
    if (amount) return amount + ' SATS'
  }

  const fiatValueWithUSD = () => {
    if (amount) return fiatValue + ' USD'
  }

  const handleKeyPress = (k: string) => {
    if (k === 'x' && !amount.length) return
    setAmount((amount) => (k === 'x' ? amount.slice(0, -1) : `${amount}${k}`))
  }

  const handleMaxPress = () => {
    if (wallet.balance < defaultFee) return setError('Total balance is below fee')
    setAmount((wallet.balance - defaultFee).toString())
  }

  const gridStyle = {
    borderTop: '1px solid var(--dark50)',
    marginTop: '0.5rem',
    textAlign: 'center',
    width: '100%',
  }

  const rowStyle = {
    fontSize: '1.5rem',
    padding: '1rem',
  }

  return (
    <>
      <Header text='Amount' back={back} max={handleMaxPress} />
      <Content>
        <Error error={Boolean(error)} text={error} />
        <div style={{ paddingTop: '3rem' }} />
        <TextEmphasys centered>{amountWithSats()}</TextEmphasys>
        <TextSecondary centered>{fiatValueWithUSD()}</TextSecondary>
      </Content>
      <TextSecondary centered>{wallet.balance} sats available</TextSecondary>
      <IonGrid style={gridStyle}>
        <IonRow style={rowStyle}>
          <IonCol size='4' onClick={() => handleKeyPress('1')}>
            1
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('2')}>
            2
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('3')}>
            3
          </IonCol>
        </IonRow>
        <IonRow style={rowStyle}>
          <IonCol size='4' onClick={() => handleKeyPress('4')}>
            4
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('5')}>
            5
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('6')}>
            6
          </IonCol>
        </IonRow>
        <IonRow style={rowStyle}>
          <IonCol size='4' onClick={() => handleKeyPress('7')}>
            7
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('8')}>
            8
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('9')}>
            9
          </IonCol>
        </IonRow>
        <IonRow style={rowStyle}>
          <IonCol size='4' onClick={() => handleKeyPress('.')}>
            .
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('0')}>
            0
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('x')}>
            x
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  )
}
