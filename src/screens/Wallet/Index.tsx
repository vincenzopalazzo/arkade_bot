import { useContext, useEffect, useState } from 'react'
import Balance from '../../components/Balance'
import Error from '../../components/Error'
import TransactionsList from '../../components/TransactionsList'
import { WalletContext } from '../../providers/wallet'
import { AspContext } from '../../providers/asp'
import { IonContent } from '@ionic/react'
import LogoIcon from '../../icons/Logo'

export default function Wallet() {
  const { aspInfo } = useContext(AspContext)
  const { reloadWallet, wallet } = useContext(WalletContext)

  const [error, setError] = useState(false)

  useEffect(() => {
    reloadWallet()
  }, [])

  useEffect(() => {
    setError(aspInfo.unreachable)
  }, [aspInfo.unreachable])

  return (
    <IonContent>
      <LogoIcon />
      <Balance sats={wallet.balance} />
      <Error error={error} text='Asp unreachable' />
      <TransactionsList />
    </IonContent>
  )
}
