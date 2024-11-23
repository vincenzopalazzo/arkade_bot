import { IonButton, IonButtons, IonCol, IonGrid, IonHeader, IonRow, IonTitle } from '@ionic/react'
import BackIcon from '../icons/Back'
import Shadow from './Shadow'
import { TextMini } from './Text'

interface HeaderProps {
  back?: () => void
  max?: () => void
  text: string
}

export default function Header({ back, max, text }: HeaderProps) {
  const MaxButton = () => (
    <Shadow onClick={max}>
      <TextMini centered>Max</TextMini>
    </Shadow>
  )
  return (
    <IonHeader>
      <IonGrid>
        <IonRow>
          <IonCol size='1'>
            {back ? (
              <IonButtons>
                <IonButton onClick={back}>
                  <BackIcon />
                </IonButton>
              </IonButtons>
            ) : null}
          </IonCol>
          <IonCol>
            <IonTitle class='ion-text-center'>{text}</IonTitle>
          </IonCol>
          <IonCol size='1'>{max ? <MaxButton /> : null}</IonCol>
        </IonRow>
      </IonGrid>
    </IonHeader>
  )
}
