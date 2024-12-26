import { ReactElement, ReactNode, createContext, useState } from 'react'
import BackupIcon from '../icons/Backup'
import AppearanceIcon from '../icons/Appearance'
import InfoIcon from '../icons/Info'
import LockIcon from '../icons/Lock'
import NostrIcon from '../icons/Nostr'
import NotificationIcon from '../icons/Notification'
import ResetIcon from '../icons/Reset'
import NoteIcon from '../icons/Note'
import VtxosIcon from '../icons/Vtxos'
import ServerIcon from '../icons/Server'
import LogsIcon from '../icons/Logs'

export enum Sections {
  Advanced = 'Advanced',
  General = 'General',
  Security = 'Security',
}

export enum Options {
  Menu = 'menu',
  About = 'about',
  Appearance = 'appearance',
  Backup = 'backup',
  Lock = 'lock wallet',
  Logs = 'logs',
  Notifications = 'notifications',
  Nostr = 'nostr',
  Notes = 'notes',
  Password = 'password',
  Reset = 'reset wallet',
  Server = 'server',
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
    icon: <AppearanceIcon />,
    option: Options.Appearance,
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
    icon: <LogsIcon />,
    option: Options.Logs,
    section: Sections.Advanced,
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
    icon: <VtxosIcon />,
    option: Options.Vtxos,
    section: Sections.Advanced,
  },
]

interface SectionResponse {
  section: Sections
  options: Option[]
}

const allOptions: SectionResponse[] = [Sections.General, Sections.Security, Sections.Advanced].map((section) => {
  return {
    section,
    options: options.filter((o) => o.section === section),
  }
})

interface OptionsContextProps {
  option: Options
  goBack: () => void
  setOption: (o: Options) => void
  validOptions: () => SectionResponse[]
}

export const OptionsContext = createContext<OptionsContextProps>({
  option: Options.Menu,
  goBack: () => {},
  setOption: () => {},
  validOptions: () => [],
})

export const OptionsProvider = ({ children }: { children: ReactNode }) => {
  const [option, setOption] = useState(Options.Menu)

  const goBack = () => setOption(Options.Menu)

  const validOptions = (): SectionResponse[] => {
    return allOptions
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
