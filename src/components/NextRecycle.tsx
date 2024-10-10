import { useContext } from 'react'
import { WalletContext } from '../providers/wallet'
import Label from './Label'
import { prettyAgo, prettyDate } from '../lib/format'
import { NavigationContext, Pages } from '../providers/navigation'
import ArrowIcon from '../icons/Arrow'

export default function NextRecycle() {
  const { navigate } = useContext(NavigationContext)
  const { wallet } = useContext(WalletContext)

  const handleClick = () => navigate(Pages.Vtxos)
  const urgent = wallet.nextRecycle - Math.floor(new Date().getTime() / 1000) < 86_400
  const bg = urgent ? 'bg-red-200 dark:bg-red-800' : 'bg-gray-100 dark:bg-gray-800'

  return (
    <div>
      <Label text='Next recycle' />
      <div className={`border cursor-pointer p-2 flex justify-between w-full rounded-md ${bg}`} onClick={handleClick}>
        <p>{prettyDate(wallet.nextRecycle)}</p>
        <div className='flex'>
          <p className='mr-2'>{prettyAgo(wallet.nextRecycle)}</p>
          <ArrowIcon tiny />
        </div>
      </div>
    </div>
  )
}
