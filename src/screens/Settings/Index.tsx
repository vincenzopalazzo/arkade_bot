import { ReactElement, useContext, useEffect, useState } from 'react'
import Lock from './Lock'
import Header from './Header'
import ArrowIcon from '../../icons/Arrow'
import Notifications from './Notifications'
import { WalletContext } from '../../providers/wallet'
import EncryptIcon from '../../icons/Encrypt'
import Backup from './Backup'
import BackupIcon from '../../icons/Backup'
import OuterContainer from '../../components/OuterContainer'
import ResetIcon from '../../icons/Reset'
import Reset from './Reset'
import InfoIcon from '../../icons/Info'
import About from './About'
import DarkThemeIcon from '../../icons/DarkTheme'
import Theme from './Theme'
import NostrIcon from '../../icons/Nostr'
import Nostr from './Nostr'
import ClockIcon from '../../icons/Clock'
import Vtxos from './Vtxos'
import NotificationIcon from '../../icons/Notification'

enum Options {
  Menu = 'menu',
  About = 'about',
  Backup = 'backup',
  Lock = 'lock wallet',
  Notifications = 'notifications',
  Nostr = 'nostr',
  Password = 'password',
  Reset = 'reset',
  Theme = 'theme',
  Vtxos = 'vtxos',
}

interface Option {
  icon: ReactElement
  option: Options
}

export default function Settings() {
  const { wallet } = useContext(WalletContext)

  const [option, setOption] = useState(Options.Menu)

  const hideBack = option === Options.Menu

  const options: Option[] = [
    {
      icon: <InfoIcon />,
      option: Options.About,
    },
    {
      icon: <BackupIcon />,
      option: Options.Backup,
    },
    {
      icon: <EncryptIcon />,
      option: Options.Lock,
    },
    {
      icon: <NostrIcon />,
      option: Options.Nostr,
    },
    {
      icon: <NotificationIcon />,
      option: Options.Notifications,
    },
    {
      icon: <ResetIcon />,
      option: Options.Reset,
    },
    {
      icon: <DarkThemeIcon />,
      option: Options.Theme,
    },
    {
      icon: <ClockIcon />,
      option: Options.Vtxos,
    },
  ]

  const validOptions = (): Option[] => {
    if (wallet.initialized) return options
    const commonOptions = [Options.About, Options.Theme]
    return options.filter((o) => commonOptions.includes(o.option))
  }

  useEffect(() => console.log('wallet.initialized', wallet.initialized, [wallet.initialized]))

  return (
    <OuterContainer>
      <Header hideBack={hideBack} setOption={setOption} />
      <div className='grow'>
        {option === Options.Menu && (
          <div className='flex flex-col h-full justify-between'>
            <div>
              {validOptions().map(({ icon, option }) => (
                <div
                  className='flex justify-between cursor-pointer px-2.5 py-2.5 first:border-t-2 border-b-2 dark:border-gray-700'
                  key={option}
                  onClick={() => setOption(option)}
                >
                  <div className='flex items-center'>
                    {icon}
                    <p className='ml-4 text-xl capitalize'>{option}</p>
                  </div>
                  <div className='flex items-center'>
                    <ArrowIcon />
                  </div>
                </div>
              ))}
            </div>
            <p className='font-semibold text-xs text-center'>v2024102203</p>
          </div>
        )}
        {option === Options.About && <About />}
        {option === Options.Backup && <Backup />}
        {option === Options.Lock && <Lock />}
        {option === Options.Notifications && <Notifications />}
        {option === Options.Nostr && <Nostr />}
        {option === Options.Reset && <Reset backup={() => setOption(Options.Backup)} />}
        {option === Options.Theme && <Theme />}
        {option === Options.Vtxos && <Vtxos />}
      </div>
    </OuterContainer>
  )
}
