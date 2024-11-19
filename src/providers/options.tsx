import { ReactElement, ReactNode, createContext, useContext, useState } from 'react'
import { WalletContext } from './wallet'
import BackupIcon from '../icons/Backup'
import DarkThemeIcon from '../icons/DarkTheme'
import InfoIcon from '../icons/Info'
import LockIcon from '../icons/Lock'
import NostrIcon from '../icons/Nostr'
import NotificationIcon from '../icons/Notification'
import ResetIcon from '../icons/Reset'
import VoucherIcon from '../icons/Voucher'
import VtxosIcon from '../icons/Vtxos'
import ServerIcon from '../icons/Server'

export enum Options {
  Menu = 'menu',
  About = 'about',
  Backup = 'backup',
  Lock = 'lock wallet',
  Notifications = 'notifications',
  Nostr = 'nostr',
  Notes = 'notes',
  Password = 'password',
  Reset = 'reset',
  Server = 'server',
  Theme = 'theme',
  Vtxos = 'vtxos',
}

interface Option {
  icon: ReactElement
  option: Options
}

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
    icon: <LockIcon />,
    option: Options.Lock,
  },
  {
    icon: <NostrIcon />,
    option: Options.Nostr,
  },
  {
    icon: <VoucherIcon />,
    option: Options.Notes,
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
    icon: <ServerIcon />,
    option: Options.Server,
  },
  {
    icon: <DarkThemeIcon />,
    option: Options.Theme,
  },
  {
    icon: <VtxosIcon />,
    option: Options.Vtxos,
  },
]

interface OptionsContextProps {
  option: Options
  goBack: () => void
  setOption: (o: Options) => void
  validOptions: () => Option[]
}

export const OptionsContext = createContext<OptionsContextProps>({
  option: Options.Menu,
  goBack: () => {},
  setOption: () => {},
  validOptions: () => [],
})

export const OptionsProvider = ({ children }: { children: ReactNode }) => {
  const { wallet } = useContext(WalletContext)

  const [option, setOption] = useState(Options.Menu)

  const goBack = () => setOption(Options.Menu)

  const validOptions = (): Option[] => {
    if (wallet.initialized) return options
    const commonOptions = [Options.About, Options.Theme]
    return options.filter((o) => commonOptions.includes(o.option))
  }

  return (
    <OptionsContext.Provider
      value={{
        option,
        goBack,
        setOption,
        validOptions,
      }}
    >
      {children}
    </OptionsContext.Provider>
  )
}
