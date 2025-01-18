import { IonHeader, IonTitle } from '@ionic/react'
import BackIcon from '../icons/Back'
import Shadow from './Shadow'
import Text from './Text'
import FlexRow from './FlexRow'

interface HeaderProps {
  all?: () => void
  back?: () => void
  clear?: () => void
  max?: () => void
  text: string
}

export default function Header({ all, back, clear, max, text }: HeaderProps) {
  const SideButton = (text: string, onClick: () => void) => (
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
          {max ? (
            SideButton('Max', max)
          ) : all ? (
            SideButton('All', all)
          ) : clear ? (
            SideButton('Clear', clear)
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
      </FlexRow>
    </IonHeader>
  )
}
