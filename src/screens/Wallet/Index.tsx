import React, { useContext, useEffect, useState } from 'react'
import Balance from '../../components/Balance'
import Error from '../../components/Error'
import TransactionsList from '../../components/TransactionsList'
import { WalletContext } from '../../providers/wallet'
import { AspContext } from '../../providers/asp'
import LogoIcon from '../../icons/Logo'
import Padded from '../../components/Padded'
import Content from '../../components/Content'

function Wallet() {
  const { aspInfo } = useContext(AspContext)
  const { wallet } = useContext(WalletContext)

  const [error, setError] = useState(false)

  useEffect(() => {
    setError(aspInfo.unreachable)
  }, [aspInfo.unreachable])

  return (
    <Content>
      <Padded>
        <LogoIcon />
        <div style={{ marginTop: '3rem' }} />
        <Balance sats={wallet.balance} />
        <Error error={error} text='Asp unreachable' />
      </Padded>
      <div style={{ marginTop: '2rem' }} />
      <TransactionsList />
    </Content>
  )
}

export default React.memo(Wallet)
