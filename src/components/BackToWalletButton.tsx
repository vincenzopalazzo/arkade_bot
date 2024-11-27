import { useContext } from 'react'
import { NavigationContext, Pages } from '../providers/navigation'
import Button from './Button'
import { WalletContext } from '../providers/wallet'

export default function BackToWalletButton() {
  const { navigate } = useContext(NavigationContext)
  const { reloadWallet } = useContext(WalletContext)

  const goBack = () => {
    reloadWallet()
    navigate(Pages.Wallet)
  }

  return <Button onClick={goBack} label='Back to wallet' secondary />
}
