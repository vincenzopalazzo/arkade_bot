import { IonContent } from '@ionic/react'
import { ReactNode } from 'react'

interface ContentProps {
  children: ReactNode
}

export default function Content({ children }: ContentProps) {
  return (
    <IonContent>
      <div style={{ height: '100%', marginTop: '2rem' }}>{children}</div>
    </IonContent>
  )
}
