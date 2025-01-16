import { useContext } from 'react'
import { WalletContext } from '../providers/wallet'
import Text, { TextLabel, TextSecondary } from './Text'
import { Tx } from '../lib/types'
import { prettyAmount, prettyDate, prettyLongText } from '../lib/format'
import PendingIcon from '../icons/Pending'
import ReceivedIcon from '../icons/Received'
import SentIcon from '../icons/Sent'
import FlexRow from './FlexRow'
import { FlowContext } from '../providers/flow'
import { NavigationContext, Pages } from '../providers/navigation'

const border = '1px solid var(--dark20)'

const TransactionLine = ({ tx }: { tx: Tx }) => {
  const { setTxInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)

  const prefix = tx.type === 'sent' ? '-' : '+'
  const amount = `${prefix} ${prettyAmount(tx.amount)}`
  const txid = tx.explorable ? `(${prettyLongText(tx.explorable, 3)})` : ''

  const Icon = () => (tx.pending ? <PendingIcon /> : tx.type === 'sent' ? <SentIcon /> : <ReceivedIcon />)
  const Kind = () => (tx.type === 'sent' ? <Text>Sent {txid}</Text> : <Text>Received {txid}</Text>)
  const Date = () => <TextSecondary>{prettyDate(tx.createdAt)}</TextSecondary>
  const Sats = () => (tx.type === 'sent' ? <Text>{amount}</Text> : <Text color='green'>{amount}</Text>)
  const Last = () => (tx.type === 'sent' ? <Text>Sent</Text> : <Text color='green'>Received</Text>)

  const handleClick = () => {
    setTxInfo(tx)
    navigate(Pages.Transaction)
  }

  const rowStyle = {
    alignItems: 'center',
    borderTop: border,
    cursor: 'pointer',
    padding: '0.5rem 1rem',
  }

  return (
    <div style={rowStyle} onClick={handleClick}>
      <FlexRow>
        <FlexRow>
          <Icon />
          <div>
            <Kind />
            <Date />
          </div>
        </FlexRow>
        <div style={{ textAlign: 'right' }}>
          <Sats />
          <Last />
        </div>
      </FlexRow>
    </div>
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

  const key = (tx: Tx) => `${tx.amount}${tx.createdAt}${tx.boardingTxid}${tx.roundTxid}${tx.redeemTxid}${tx.type}`

  return (
    <div style={{ marginTop: '2rem' }}>
      <TextLabel>Transaction history</TextLabel>
      <div style={{ borderBottom: border }}>
        {showTxs.map((tx) => (
          <TransactionLine key={key(tx)} tx={tx} />
        ))}
      </div>
    </div>
  )
}
