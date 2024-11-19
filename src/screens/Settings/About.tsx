import { useContext } from 'react'
import { IonContent } from '@ionic/react'
import { AspContext } from '../../providers/asp'
import { prettyLongText } from '../../lib/format'
import Header from './Header'
import Table from '../../components/Table'

export default function About() {
  const { aspInfo } = useContext(AspContext)

  const days = Math.round(aspInfo.roundLifetime / 60 / 60 / 24)

  const data = [
    ['Dust', `${aspInfo.dust} sats`],
    ['Forfeit address', prettyLongText(aspInfo.forfeitAddress, 10)],
    ['Network', aspInfo.network],
    ['Round Interval', `${aspInfo.roundInterval} secs`],
    ['Round Lifetime', `${days} days`],
    ['Server Pubkey', prettyLongText(aspInfo.pubkey, 10)],
    ['Unilateral Exit Delay', `${aspInfo.unilateralExitDelay} secs`],
    ['URL', aspInfo.url],
  ]

  return (
    <IonContent>
      <Header text='About' back />
      <Table data={data} />
    </IonContent>
  )
}
