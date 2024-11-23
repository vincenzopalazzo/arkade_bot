import { IonCol, IonGrid, IonRow } from '@ionic/react'
import Header from './Header'
import Content from './Content'
import { useContext, useEffect, useState } from 'react'
import Text, { TextSecondary } from './Text'
import { FiatContext } from '../providers/fiat'
import { prettyNumber } from '../lib/format'
import { WalletContext } from '../providers/wallet'
import { defaultFee } from '../lib/constants'
import Error from './Error'
import Button from './Button'
import Padded from './Padded'

interface KeyboardProps {
  back: () => void
  hideBalance?: boolean
  onChange: (arg0: number) => void
  value: number
}

export default function Keyboard({ back, hideBalance, onChange, value }: KeyboardProps) {
  const { toUSD } = useContext(FiatContext)
  const { wallet } = useContext(WalletContext)

  const [sats, setSats] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    setSats(value)
  }, [value])

  const amountWithSats = () => {
    if (sats) return prettyNumber(sats) + ' SATS'
  }

  const fiatValueWithUSD = () => {
    if (!sats) return
    return prettyNumber(toUSD(sats), 2)
  }

  const handleKeyPress = (k: string) => {
    if (k === 'x' && !sats) return
    const text = sats.toString()
    const res = k === 'x' ? text.slice(0, -1) : text + k
    setSats(Number(res))
  }

  const handleMaxPress = () => {
    if (wallet.balance < defaultFee) return setError('Total balance is below fee')
    setSats(wallet.balance - defaultFee)
  }

  const handleSave = () => {
    onChange(sats)
    back()
  }

  const disabled = !sats || Number.isNaN(sats)

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
      <Header text='Amount' back={back} max={hideBalance ? undefined : handleMaxPress} />
      <Content>
        <Error error={Boolean(error)} text={error} />
        <div style={{ paddingTop: '3rem' }} />
        <Text big centered>
          {amountWithSats()}
        </Text>
        <TextSecondary centered>{fiatValueWithUSD()}</TextSecondary>
      </Content>
      {hideBalance ? null : <TextSecondary centered>{wallet.balance} sats available</TextSecondary>}
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
          <IonCol size='4'>.</IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('0')}>
            0
          </IonCol>
          <IonCol size='4' onClick={() => handleKeyPress('x')}>
            x
          </IonCol>
        </IonRow>
      </IonGrid>
      <Padded>
        <Button label='Save' disabled={disabled} onClick={handleSave} />
      </Padded>
    </>
  )
}
