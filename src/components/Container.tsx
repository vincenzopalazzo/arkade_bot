import { IonContent } from '@ionic/react'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <IonContent>{children}</IonContent>
}
