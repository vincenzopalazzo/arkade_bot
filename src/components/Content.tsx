import { IonCol, IonGrid, IonRow } from '@ionic/react'
import { ReactNode } from 'react'

interface ContentProps {
  children: ReactNode
}

export default function Content({ children }: ContentProps) {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>{children}</IonCol>
      </IonRow>
    </IonGrid>
  )
}
