import { useContext } from 'react'
import { Wallet, WalletContext } from '../providers/wallet'
import Label from './Label'
import { Tx } from '../lib/types'
import { prettyAgo, prettyNumber } from '../lib/format'
import ArrowIcon from '../icons/Arrow'
import { NavigationContext, Pages } from '../providers/navigation'
import Pill from './Pill'

const TransactionLine = ({ data }: { data: Tx; wallet: Wallet }) => {
  const { navigate } = useContext(NavigationContext)
  const prefix = data.type === 'sent' ? '-' : '+'
  const amount = `${prefix} ${prettyNumber(data.amount)} sats`
  const date = prettyAgo(data.createdAt)
  return (
    <div
      className='border cursor-pointer p-2 flex justify-between w-full rounded-md'
      onClick={() => navigate(Pages.Transactions)}
    >
      <p className='text-left w-2/5'>{amount}</p>
      {data.isPending ? <Pill text='Pending' /> : null}
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

  return (
    <div className='mt-4'>
      <Label text={`${short ? 'Last' : 'All'} transactions`} />
      <div className='flex flex-col gap-2 h-72 overflow-auto'>
        {showTxs.map((t) => (
          <TransactionLine key={`${t.createdAt}${t.boardingTxid}${t.roundTxid}`} data={t} wallet={wallet} />
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
