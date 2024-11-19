import { useContext } from 'react'
import { WalletContext } from '../providers/wallet'
import Label from './Label'
import Text from './Text'
import { Tx } from '../lib/types'
import { prettyDate, prettyNumber } from '../lib/format'
import { IonCol, IonGrid, IonItem, IonList, IonRow } from '@ionic/react'

const TransactionLine = ({ tx }: { tx: Tx }) => {
  const prefix = tx.type === 'sent' ? '-' : '+'
  const amount = `${prefix} ${prettyNumber(tx.amount)} sats`
  const date = prettyDate(tx.createdAt)

  return (
    <IonGrid>
      {tx.type === 'received' ? (
        <IonRow>
          <IonCol size='1'>Icon</IonCol>
          <IonCol>
            <Text>Received (xxx...xxx)</Text>
            <Text secondary>{date}</Text>
          </IonCol>
          <IonCol class='ion-text-end'>
            <Text green>{amount}</Text>
            <Text green>Received</Text>
          </IonCol>
        </IonRow>
      ) : (
        <IonRow>
          <IonCol size='1'>Icon</IonCol>
          <IonCol>
            <Text>Sent (xxx...xxx)</Text>
            <Text secondary>{date}</Text>
          </IonCol>
          <IonCol class='ion-text-end'>
            <Text>{amount}</Text>
            <Text secondary>Sent</Text>
          </IonCol>
        </IonRow>
      )}
    </IonGrid>
  )
}

export default function TransactionsList({ short }: { short?: boolean }) {
  const { wallet } = useContext(WalletContext)

  const transactions = wallet.txs

  if (transactions?.length === 0) return <></>

  const sortFunction = (a: Tx, b: Tx) => (!a.createdAt ? -1 : !b.createdAt ? 1 : b.createdAt - a.createdAt)

  const showMax = 4
  const pending = wallet.txs.filter((tx) => tx.pending).sort(sortFunction)
  const settled = wallet.txs.filter((tx) => !tx.pending).sort(sortFunction)
  const ordered = [...pending, ...settled]
  const showTxs = short ? ordered.slice(0, showMax) : ordered

  const key = (tx: Tx) => `${tx.createdAt}${tx.boardingTxid}${tx.roundTxid}${tx.redeemTxid}`

  return (
    <>
      <Label text='Transaction history' />
      <IonList>
        {showTxs.map((tx) => (
          <IonItem key={key(tx)}>
            <TransactionLine tx={tx} />
          </IonItem>
        ))}
      </IonList>
    </>
  )
}
