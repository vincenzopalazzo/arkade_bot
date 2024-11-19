import { IonButton, IonButtons, IonCol, IonGrid, IonHeader, IonRow, IonTitle } from '@ionic/react'
import BackIcon from '../icons/Back'

interface HeaderProps {
  back?: () => void
  text: string
}

export default function Header({ back, text }: HeaderProps) {
  return (
    <IonHeader class='ion-no-border'>
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
          <IonCol size='10'>
            <IonTitle class='ion-text-center'>{text}</IonTitle>
          </IonCol>
          <IonCol size='1' />
        </IonRow>
      </IonGrid>
    </IonHeader>
  )
}
