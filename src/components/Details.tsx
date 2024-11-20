import { IonCol, IonGrid, IonRow } from '@ionic/react'
import { prettyLongText, prettyNumber } from '../lib/format'

export const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <IonRow>
      <IonCol>{title}</IonCol>
      <IonCol class='ion-text-end'>{value}</IonCol>
    </IonRow>
  )
}

export interface DetailsProps {
  address?: string
  arknote?: string
  invoice?: string
  comment?: string
  fees?: number
  satoshis: number
  total?: number
}

export default function Details({ details }: { details?: DetailsProps }) {
  if (!details) return <></>
  const { address, arknote, comment, fees, invoice, satoshis, total } = details
  return (
    <IonGrid>
      {arknote ? <Item title='Arknote' value={prettyLongText(arknote)} /> : null}
      {invoice ? <Item title='Invoice' value={prettyLongText(invoice)} /> : null}
      {address ? <Item title='Address' value={prettyLongText(address)} /> : null}
      {comment ? <Item title='Comment' value={comment} /> : null}
      <Item title='Amount' value={`${prettyNumber(satoshis)} sats`} />
      {fees ? <Item title='Network fees' value={`${prettyNumber(fees)} sats`} /> : null}
      {total ? <Item title='Total' value={`${prettyNumber(total)} sats`} /> : null}
    </IonGrid>
  )
}
