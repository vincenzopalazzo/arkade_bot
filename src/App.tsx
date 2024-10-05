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

export default function App() {
  const { wasmLoaded } = useContext(WalletContext)
  const { configLoaded, showConfig } = useContext(ConfigContext)
  const { screen } = useContext(NavigationContext)

  if (!configLoaded || !wasmLoaded) return <Loading />
  if (showConfig) return <Settings />

  return (
    <OuterContainer>
      <Header />
      <div className='grow'>
        {screen === Pages.Init && <Init />}
        {screen === Pages.InitNew && <InitNew />}
        {screen === Pages.InitOld && <InitOld />}
        {screen === Pages.InitPassword && <InitPassword />}
        {screen === Pages.InitConnect && <InitConnect />}
        {screen === Pages.ReceiveAmount && <ReceiveAmount />}
        {screen === Pages.ReceiveInvoice && <ReceiveInvoice />}
        {screen === Pages.ReceiveSuccess && <ReceiveSuccess />}
        {screen === Pages.SendAmount && <SendAmount />}
        {screen === Pages.SendInvoice && <SendInvoice />}
        {screen === Pages.SendDetails && <SendDetails />}
        {screen === Pages.SendFees && <SendFees />}
        {screen === Pages.SendPayment && <SendPayment />}
        {screen === Pages.SendSuccess && <SendSuccess />}
        {screen === Pages.Transactions && <Transactions />}
        {screen === Pages.Transaction && <Transaction />}
        {screen === Pages.Unlock && <Unlock />}
        {screen === Pages.Wallet && <Wallet />}
      </div>
    </OuterContainer>
  )
}
