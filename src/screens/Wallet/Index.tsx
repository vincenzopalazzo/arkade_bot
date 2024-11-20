import { useContext, useEffect, useState } from 'react'
import Balance from '../../components/Balance'
import Error from '../../components/Error'
import TransactionsList from '../../components/TransactionsList'
import { WalletContext } from '../../providers/wallet'
import { AspContext } from '../../providers/asp'
import { IonContent } from '@ionic/react'
import LogoIcon from '../../icons/Logo'
import Content from '../../components/Content'

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
      <Content>
        <LogoIcon />
        <Balance sats={wallet.balance} />
        <Error error={error} text='Asp unreachable' />
      </Content>
      <TransactionsList />
    </IonContent>
  )
}
