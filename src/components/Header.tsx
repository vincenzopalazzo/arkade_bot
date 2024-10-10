import { useContext } from 'react'
import LogoIcon from '../icons/Logo'
import SettingsIcon from '../icons/Settings'
import { ConfigContext } from '../providers/config'
import { NavigationContext, Pages } from '../providers/navigation'
import { WalletContext } from '../providers/wallet'
import Pill from './Pill'

export default function Header() {
  const { toggleShowConfig } = useContext(ConfigContext)
  const { navigate } = useContext(NavigationContext)
  const { wallet } = useContext(WalletContext)

  const handleClick = () => {
    navigate(wallet.initialized ? Pages.Wallet : Pages.Init)
  }

  return (
    <header className='flex justify-between w-full mb-6'>
      <button
        onClick={handleClick}
        aria-label='Back to homepage'
        className='p-2 rounded-full bg-gray-100 dark:bg-gray-800'
      >
        <LogoIcon />
      </button>
      <Pill text={wallet.network} />
      <button onClick={toggleShowConfig} className='p-2 rounded-full bg-gray-100 dark:bg-gray-800'>
        <SettingsIcon />
      </button>
    </header>
  )
}
