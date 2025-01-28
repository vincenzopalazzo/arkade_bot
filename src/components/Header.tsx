import { IonHeader, IonTitle } from '@ionic/react'
import BackIcon from '../icons/Back'
import Shadow from './Shadow'
import Text from './Text'
import FlexRow from './FlexRow'

interface HeaderProps {
  auxFunc?: () => void
  auxText?: string
  back?: () => void
  text: string
}

export default function Header({ auxFunc, auxText, back, text }: HeaderProps) {
  const SideButton = (text: string, onClick = () => {}) => (
    <Shadow onClick={onClick}>
      <Text color='dark80' centered tiny wrap>
        {text}
      </Text>
    </Shadow>
  )

  return (
    <IonHeader style={{ boxShadow: 'none' }}>
      <FlexRow between>
        <div style={{ minWidth: '4rem' }}>
          {back ? (
            <div onClick={back} style={{ cursor: 'pointer', marginLeft: '0.5rem' }}>
              <BackIcon />
            </div>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
        <IonTitle class='ion-text-center'>{text}</IonTitle>
        <div style={{ minWidth: '4rem', paddingRight: '1rem' }}>
          {auxText ? SideButton(auxText, auxFunc) : <p>&nbsp;</p>}
        </div>
      </FlexRow>
    </IonHeader>
  )
}
