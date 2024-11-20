import { ReactNode, createContext, useState } from 'react'
import Init from '../screens/Init/Init'
import InitConnect from '../screens/Init/Connect'
import InitNew from '../screens/Init/New'
import InitOld from '../screens/Init/Restore'
import InitPassword from '../screens/Init/Password'
import Loading from '../components/Loading'
import NoteRedeem from '../screens/Wallet/Vouchers/Redeem'
import NoteScan from '../screens/Wallet/Vouchers/Scan'
import NoteSuccess from '../screens/Wallet/Vouchers/Success'
import ReceiveAmount from '../screens/Wallet/Receive/Amount'
import ReceiveQRCode from '../screens/Wallet/Receive/Invoice'
import ReceiveSuccess from '../screens/Wallet/Receive/Success'
import SendAmount from '../screens/Wallet/Send/Amount'
import SendForm from '../screens/Wallet/Send/Form'
import SendDetails from '../screens/Wallet/Send/Details'
import SendFees from '../screens/Wallet/Send/Fees'
import SendPayment from '../screens/Wallet/Send/Pay'
import SendSuccess from '../screens/Wallet/Send/Success'
import Transaction from '../screens/Wallet/Transaction'
import Transactions from '../screens/Wallet/Transactions'
import Unlock from '../screens/Wallet/Unlock'
import Vtxos from '../screens/Settings/Vtxos'
import Wallet from '../screens/Wallet/Index'
import Settings from '../screens/Settings/Index'

export enum Pages {
  Init,
  InitNew,
  InitOld,
  InitPassword,
  InitConnect,
  Loading,
  NoteRedeem,
  NoteScan,
  NoteSuccess,
  ReceiveAmount,
  ReceiveQRCode,
  ReceiveSuccess,
  SendAmount,
  SendForm,
  SendDetails,
  SendFees,
  SendPayment,
  SendSuccess,
  Settings,
  Transaction,
  Transactions,
  Unlock,
  Vtxos,
  Wallet,
}

export enum Tabs {
  None = 'none',
  Home = 'home',
  Send = 'send',
  Receive = 'receive',
  Settings = 'settings',
}

const pageTab = {
  [Pages.Init]: Tabs.None,
  [Pages.InitNew]: Tabs.None,
  [Pages.InitOld]: Tabs.None,
  [Pages.InitPassword]: Tabs.None,
  [Pages.InitConnect]: Tabs.None,
  [Pages.Loading]: Tabs.None,
  [Pages.NoteRedeem]: Tabs.Settings,
  [Pages.NoteScan]: Tabs.Settings,
  [Pages.NoteSuccess]: Tabs.Settings,
  [Pages.ReceiveAmount]: Tabs.Receive,
  [Pages.ReceiveQRCode]: Tabs.Receive,
  [Pages.ReceiveSuccess]: Tabs.Receive,
  [Pages.SendAmount]: Tabs.Send,
  [Pages.SendForm]: Tabs.Send,
  [Pages.SendDetails]: Tabs.Send,
  [Pages.SendFees]: Tabs.Send,
  [Pages.SendPayment]: Tabs.Send,
  [Pages.SendSuccess]: Tabs.Send,
  [Pages.Settings]: Tabs.Settings,
  [Pages.Transaction]: Tabs.Home,
  [Pages.Transactions]: Tabs.Home,
  [Pages.Unlock]: Tabs.None,
  [Pages.Vtxos]: Tabs.Settings,
  [Pages.Wallet]: Tabs.Home,
}

export const pageComponent = (page: Pages): JSX.Element => {
  switch (page) {
    case Pages.Init:
      return <Init />
    case Pages.InitConnect:
      return <InitConnect />
    case Pages.InitNew:
      return <InitNew />
    case Pages.InitOld:
      return <InitOld />
    case Pages.InitPassword:
      return <InitPassword />
    case Pages.Loading:
      return <Loading />
    case Pages.NoteRedeem:
      return <NoteRedeem />
    case Pages.NoteScan:
      return <NoteScan />
    case Pages.NoteSuccess:
      return <NoteSuccess />
    case Pages.ReceiveAmount:
      return <ReceiveAmount />
    case Pages.ReceiveQRCode:
      return <ReceiveQRCode />
    case Pages.ReceiveSuccess:
      return <ReceiveSuccess />
    case Pages.SendAmount:
      return <SendAmount />
    case Pages.SendForm:
      return <SendForm />
    case Pages.SendDetails:
      return <SendDetails />
    case Pages.SendFees:
      return <SendFees />
    case Pages.SendPayment:
      return <SendPayment />
    case Pages.SendSuccess:
      return <SendSuccess />
    case Pages.Settings:
      return <Settings />
    case Pages.Transaction:
      return <Transaction />
    case Pages.Transactions:
      return <Transactions />
    case Pages.Unlock:
      return <Unlock />
    case Pages.Vtxos:
      return <Vtxos />
    case Pages.Wallet:
      return <Wallet />
    default:
      return <></>
  }
}

interface NavigationContextProps {
  navigate: (arg0: Pages) => void
  screen: Pages
  tab: Tabs
}

export const NavigationContext = createContext<NavigationContextProps>({
  navigate: () => {},
  screen: Pages.Init,
  tab: Tabs.None,
})

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState(Pages.Init)
  const [tab, setTab] = useState(Tabs.None)

  const navigate = (p: Pages) => {
    setScreen(p)
    setTab(pageTab[p])
  }

  return <NavigationContext.Provider value={{ navigate, screen, tab }}>{children}</NavigationContext.Provider>
}
