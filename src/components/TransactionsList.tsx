import { useContext } from 'react'
import { WalletContext } from '../providers/wallet'
import Label from './Label'
import Text from './Text'
import { Tx } from '../lib/types'
import { prettyDate, prettyNumber } from '../lib/format'
import { IonCol, IonGrid, IonRow } from '@ionic/react'
import Content from './Content'
import PendingIcon from '../icons/Pending'
import ReceivedIcon from '../icons/Received'
import SentIcon from '../icons/Sent'

const TransactionLine = ({ tx }: { tx: Tx }) => {
  const prefix = tx.type === 'sent' ? '-' : '+'
  const amount = `${prefix} ${prettyNumber(tx.amount)} sats`

  const Icon = () => (tx.pending ? <PendingIcon /> : tx.type === 'sent' ? <SentIcon /> : <ReceivedIcon />)
  const Kind = () => (tx.type === 'sent' ? <Text>Sent (xxx...xxx)</Text> : <Text>Received (xxx...xxx)</Text>)
  const Date = () => <Text secondary>{prettyDate(tx.createdAt)}</Text>
  const Sats = () => (tx.type === 'sent' ? <Text>{amount}</Text> : <Text green>{amount}</Text>)
  const Last = () => (tx.type === 'sent' ? <Text>Sent</Text> : <Text green>Received</Text>)

  return (
    <IonGrid>
      <IonRow>
        <IonCol size='1'>
          <Icon />
        </IonCol>
        <IonCol size='7'>
          <Kind />
          <Date />
        </IonCol>
        <IonCol class='ion-text-end'>
          <Sats />
          <Last />
        </IonCol>
      </IonRow>
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
      <Content>
        <Label text='Transaction history' />
      </Content>
      {showTxs.map((tx) => (
        <TransactionLine key={key(tx)} tx={tx} />
      ))}
    </>
  )
}
