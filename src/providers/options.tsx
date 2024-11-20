import { ReactElement, ReactNode, createContext, useContext, useState } from 'react'
import { WalletContext } from './wallet'
import BackupIcon from '../icons/Backup'
import DarkThemeIcon from '../icons/DarkTheme'
import InfoIcon from '../icons/Info'
import LockIcon from '../icons/Lock'
import NostrIcon from '../icons/Nostr'
import NotificationIcon from '../icons/Notification'
import ResetIcon from '../icons/Reset'
import NoteIcon from '../icons/Note'
import VtxosIcon from '../icons/Vtxos'
import ServerIcon from '../icons/Server'

export enum Sections {
  Advanced = 'Advanced',
  General = 'General',
  Security = 'Security',
}

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

export interface Option {
  icon: ReactElement
  option: Options
  section: Sections
}

const options: Option[] = [
  {
    icon: <InfoIcon />,
    option: Options.About,
    section: Sections.General,
  },
  {
    icon: <BackupIcon />,
    option: Options.Backup,
    section: Sections.Security,
  },
  {
    icon: <LockIcon />,
    option: Options.Lock,
    section: Sections.Security,
  },
  {
    icon: <NostrIcon />,
    option: Options.Nostr,
    section: Sections.General,
  },
  {
    icon: <NoteIcon />,
    option: Options.Notes,
    section: Sections.General,
  },
  {
    icon: <NotificationIcon />,
    option: Options.Notifications,
    section: Sections.General,
  },
  {
    icon: <ResetIcon />,
    option: Options.Reset,
    section: Sections.Security,
  },
  {
    icon: <ServerIcon />,
    option: Options.Server,
    section: Sections.Advanced,
  },
  {
    icon: <DarkThemeIcon />,
    option: Options.Theme,
    section: Sections.General,
  },
  {
    icon: <VtxosIcon />,
    option: Options.Vtxos,
    section: Sections.Advanced,
  },
]

interface OptionsResponse {
  section: Sections
  options: Option[]
}

const allOptions: OptionsResponse[] = [Sections.General, Sections.Security, Sections.Advanced].map((section) => {
  return {
    section,
    options: options.filter((o) => o.section === section),
  }
})

const miniOptions: OptionsResponse[] = [
  {
    section: Sections.General,
    options: options.filter((o) => [Options.About, Options.Theme].includes(o.option)),
  },
]

interface OptionsContextProps {
  option: Options
  goBack: () => void
  setOption: (o: Options) => void
  validOptions: () => OptionsResponse[]
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

  const validOptions = (): OptionsResponse[] => {
    return wallet.initialized ? allOptions : miniOptions
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
