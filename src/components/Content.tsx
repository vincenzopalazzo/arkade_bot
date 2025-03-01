import { IonContent, IonRefresher, IonRefresherContent } from '@ionic/react'
import { ReactNode } from 'react'

const handleRefresh = () => {
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}
interface ContentProps {
  children: ReactNode
}

export default function Content({ children }: ContentProps) {
  return (
    <IonContent>
      <IonRefresher slot='fixed' onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>
      <div style={{ height: '100%', paddingTop: '2rem' }}>{children}</div>
    </IonContent>
  )
}
