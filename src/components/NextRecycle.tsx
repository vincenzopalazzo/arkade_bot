import { useContext } from 'react'
import { WalletContext } from '../providers/wallet'
import { prettyAgo, prettyDate } from '../lib/format'
import { TextLabel } from './Text'

export default function NextRecycle({ onClick }: { onClick: () => void }) {
  const { wallet } = useContext(WalletContext)

  const urgent = wallet.nextRecycle - Math.floor(new Date().getTime() / 1000) < 86_400
  const bg = urgent ? 'bg-red-200 dark:bg-red-800' : 'bg-gray-100 dark:bg-gray-800'

  return (
    <div>
      <div className='flex justify-between'>
        <TextLabel>Next roll over</TextLabel>
        <div onClick={onClick}>
          <TextLabel>All VTXOs</TextLabel>
        </div>
      </div>
      <div className={`border cursor-pointer p-2 flex justify-between w-full rounded-md ${bg}`} onClick={onClick}>
        <p>{prettyDate(wallet.nextRecycle)}</p>
        <p className='mr-2'>{prettyAgo(wallet.nextRecycle)}</p>
      </div>
    </div>
  )
}
