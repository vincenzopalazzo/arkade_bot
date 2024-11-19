import { IonFooter } from '@ionic/react'
import { ReactNode } from 'react'

interface ButtonsOnBottomProps {
  children: ReactNode
}

export default function ButtonsOnBottom({ children }: ButtonsOnBottomProps) {
  return <IonFooter class='ion-padding ion-no-border'>{children}</IonFooter>
}
