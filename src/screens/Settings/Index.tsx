import { useContext } from 'react'
import Lock from './Lock'
import Notifications from './Notifications'
import Backup from './Backup'
import Reset from './Reset'
import About from './About'
import Appearance from './Appearance'
import Nostr from './Nostr'
import Vtxos from './Vtxos'
import NoteScan from '../Wallet/Vouchers/Scan'
import Server from './Server'
import { Options, OptionsContext } from '../../providers/options'
import Menu from './Menu'

export default function Settings() {
  const { option, setOption } = useContext(OptionsContext)

  return (
    <>
      {option === Options.Menu && <Menu />}
      {option === Options.About && <About />}
      {option === Options.Backup && <Backup />}
      {option === Options.Lock && <Lock />}
      {option === Options.Nostr && <Nostr />}
      {option === Options.Notes && <NoteScan />}
      {option === Options.Notifications && <Notifications />}
      {option === Options.Reset && <Reset backup={() => setOption(Options.Backup)} />}
      {option === Options.Server && <Server backup={() => setOption(Options.Backup)} />}
      {option === Options.Appearance && <Appearance />}
      {option === Options.Vtxos && <Vtxos />}
    </>
  )
}
