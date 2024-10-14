import { useContext } from 'react'
import Init from './screens/Init/Init'
import Wallet from './screens/Wallet/Index'
import Header from './components/Header'
import Settings from './screens/Settings/Index'
import Loading from './components/Loading'
import SendInvoice from './screens/Wallet/Send/Invoice'
import SendDetails from './screens/Wallet/Send/Details'
import SendPayment from './screens/Wallet/Send/Pay'
import ReceiveAmount from './screens/Wallet/Receive/Amount'
import ReceiveInvoice from './screens/Wallet/Receive/Invoice'
import InitNew from './screens/Init/New'
import InitOld from './screens/Init/Restore'
import SendFees from './screens/Wallet/Send/Fees'
import ReceiveSuccess from './screens/Wallet/Receive/Success'
import { ConfigContext } from './providers/config'
import { NavigationContext, Pages } from './providers/navigation'
import InitPassword from './screens/Init/Password'
import OuterContainer from './components/OuterContainer'
import SendSuccess from './screens/Wallet/Send/Success'
import Transactions from './screens/Wallet/Transactions'
import SendAmount from './screens/Wallet/Send/Amount'
import { WalletContext } from './providers/wallet'
import Unlock from './screens/Wallet/Unlock'
import './wasm_exec.js'
import './wasmTypes.d.ts'
import InitConnect from './screens/Init/Connect'
import Transaction from './screens/Wallet/Transaction'
import Vtxos from './screens/Wallet/Vtxos'

export default function App() {
  const { wasmLoaded, walletUnlocked } = useContext(WalletContext)
  const { configLoaded, showConfig } = useContext(ConfigContext)
  const { screen } = useContext(NavigationContext)

  if (showConfig) return <Settings />

  const page = !configLoaded || !wasmLoaded ? Pages.Loading : !walletUnlocked ? Pages.Unlock : screen

  return (
    <OuterContainer>
      <Header />
      <div className='grow'>
        {page === Pages.Init && <Init />}
        {page === Pages.InitNew && <InitNew />}
        {page === Pages.InitOld && <InitOld />}
        {page === Pages.InitPassword && <InitPassword />}
        {page === Pages.InitConnect && <InitConnect />}
        {page === Pages.Loading && <Loading />}
        {page === Pages.ReceiveAmount && <ReceiveAmount />}
        {page === Pages.ReceiveInvoice && <ReceiveInvoice />}
        {page === Pages.ReceiveSuccess && <ReceiveSuccess />}
        {page === Pages.SendAmount && <SendAmount />}
        {page === Pages.SendInvoice && <SendInvoice />}
        {page === Pages.SendDetails && <SendDetails />}
        {page === Pages.SendFees && <SendFees />}
        {page === Pages.SendPayment && <SendPayment />}
        {page === Pages.SendSuccess && <SendSuccess />}
        {page === Pages.Transactions && <Transactions />}
        {page === Pages.Transaction && <Transaction />}
        {page === Pages.Unlock && <Unlock />}
        {page === Pages.Vtxos && <Vtxos />}
        {page === Pages.Wallet && <Wallet />}
      </div>
    </OuterContainer>
  )
}
