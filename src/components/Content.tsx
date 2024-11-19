import { IonContent } from '@ionic/react'
import { ReactNode } from 'react'

interface ContentProps {
  children: ReactNode
}

export default function Content({ children }: ContentProps) {
  return <IonContent>{children}</IonContent>
}
