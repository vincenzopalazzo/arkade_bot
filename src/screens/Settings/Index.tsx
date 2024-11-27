import { useContext } from 'react'
import Lock from './Lock'
import Notifications from './Notifications'
import Backup from './Backup'
import Reset from './Reset'
import About from './About'
import Appearance from './Appearance'
import Nostr from './Nostr'
import Vtxos from './Vtxos'
import NotesForm from '../Wallet/Notes/Form'
import Server from './Server'
import { Options, OptionsContext } from '../../providers/options'
import Menu from './Menu'

export default function Settings() {
  const { option } = useContext(OptionsContext)

  return (
    <>
      {option === Options.Menu && <Menu />}
      {option === Options.About && <About />}
      {option === Options.Backup && <Backup />}
      {option === Options.Lock && <Lock />}
      {option === Options.Nostr && <Nostr />}
      {option === Options.Notes && <NotesForm />}
      {option === Options.Notifications && <Notifications />}
      {option === Options.Reset && <Reset />}
      {option === Options.Server && <Server />}
      {option === Options.Appearance && <Appearance />}
      {option === Options.Vtxos && <Vtxos />}
    </>
  )
}
