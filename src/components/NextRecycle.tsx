import { useContext } from 'react'
import { WalletContext } from '../providers/wallet'
import Label from './Label'
import { prettyAgo, prettyDate } from '../lib/format'

export default function NextRecycle({ onClick }: { onClick: () => void }) {
  const { wallet } = useContext(WalletContext)

  const urgent = wallet.nextRecycle - Math.floor(new Date().getTime() / 1000) < 86_400
  const bg = urgent ? 'bg-red-200 dark:bg-red-800' : 'bg-gray-100 dark:bg-gray-800'

  return (
    <div>
      <div className='flex justify-between'>
        <Label text='Next recycle' />
        <Label text='All VTXOs' onClick={onClick} />
      </div>
      <div className={`border cursor-pointer p-2 flex justify-between w-full rounded-md ${bg}`} onClick={onClick}>
        <p>{prettyDate(wallet.nextRecycle)}</p>
        <p className='mr-2'>{prettyAgo(wallet.nextRecycle)}</p>
      </div>
    </div>
  )
}
