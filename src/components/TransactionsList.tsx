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

  const showMax = 3
  const sorted = wallet.txs.sort((a, b) => (!a.createdAt ? -1 : !b.createdAt ? 1 : b.createdAt - a.createdAt))
  const showTxs = short ? sorted.slice(0, showMax) : sorted

  const key = (tx: Tx) => `${tx.createdAt}${tx.boardingTxid}${tx.roundTxid}${tx.redeemTxid}`

  return (
    <div className='mt-4'>
      <Label text={`${short ? 'Last' : 'All ' + showTxs.length} transactions`} />
      <div className='flex flex-col gap-2 h-60 overflow-auto'>
        {showTxs.map((tx) => (
          <TransactionLine key={key(tx)} tx={tx} />
        ))}
        {short && transactions.length > showMax ? (
          <div
            className='border bg-gray-100 dark:bg-gray-800 cursor-pointer p-2 flex justify-end w-full rounded-md'
            onClick={() => navigate(Pages.Transactions)}
          >
            <div className='flex'>
              <p className='mr-2'>View all {transactions.length} transactions</p>
              <ArrowIcon tiny />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
