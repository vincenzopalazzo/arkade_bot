import { useContext } from 'react'
import { WalletContext } from '../providers/wallet'
import Label from './Label'
import { Tx } from '../lib/types'
import { prettyAgo, prettyNumber } from '../lib/format'
import ArrowIcon from '../icons/Arrow'
import { NavigationContext, Pages } from '../providers/navigation'
import Pill from './Pill'
import { FlowContext } from '../providers/flow'

const TransactionLine = ({ tx }: { tx: Tx }) => {
  const { setTxInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)

  const prefix = tx.type === 'sent' ? '-' : '+'
  const amount = `${prefix} ${prettyNumber(tx.amount)} sats`
  const date = prettyAgo(tx.createdAt)

  const handleClick = () => {
    setTxInfo(tx)
    navigate(Pages.Transaction)
  }

  return (
    <div className='border cursor-pointer p-2 flex justify-between w-full rounded-md' onClick={handleClick}>
      <p className='text-left w-2/5'>{amount}</p>
      {tx.isPending ? <Pill text='Pending' /> : null}
      <p className='text-right w-2/5'>{date}</p>
    </div>
  )
}

export default function TransactionsList({ short }: { short?: boolean }) {
  const { navigate } = useContext(NavigationContext)
  const { wallet } = useContext(WalletContext)

  const transactions = wallet.txs

  if (transactions?.length === 0) return <></>

  const sortFunction = (a: Tx, b: Tx) => (!a.createdAt ? -1 : !b.createdAt ? 1 : b.createdAt - a.createdAt)

  const showMax = 4
  const pending = wallet.txs.filter((tx) => tx.isPending).sort(sortFunction)
  const settled = wallet.txs.filter((tx) => !tx.isPending).sort(sortFunction)
  const ordered = [...pending, ...settled]
  const showTxs = short ? ordered.slice(0, showMax) : ordered

  const key = (tx: Tx) => `${tx.createdAt}${tx.boardingTxid}${tx.roundTxid}${tx.redeemTxid}`

  return (
    <div className='mt-4'>
      <Label text={`${short ? 'Last' : 'All ' + showTxs.length} transactions`} />
      <div className='flex flex-col gap-2 max-h-72 overflow-auto'>
        {showTxs.map((tx) => (
          <TransactionLine key={key(tx)} tx={tx} />
        ))}
        {short && transactions.length > showMax ? (
          <div
            className='border bg-gray-100 dark:bg-gray-800 cursor-pointer p-2 flex justify-end w-full rounded-md'
            onClick={() => navigate(Pages.Transactions)}
          >
            <div className='flex items-center'>
              <p className='mr-2'>View all {transactions.length} transactions</p>
              <ArrowIcon small />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
