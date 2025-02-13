import React, { useContext, useEffect, useRef, useState } from 'react'
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
  const { reloadWallet, wallet } = useContext(WalletContext)

  const [error, setError] = useState(false)
  const firstRun = useRef(true)

  useEffect(() => {
    if (firstRun.current) reloadWallet()
    firstRun.current = false
  }, [])

  useEffect(() => {
    setError(aspInfo.unreachable)
  }, [aspInfo.unreachable])

  return (
    <Content>
      <Padded>
        <LogoIcon />
        <Balance amount={wallet.balance} />
        <Error error={error} text='Ark server unreachable' />
        <TransactionsList />
      </Padded>
    </Content>
  )
}

export default React.memo(Wallet)
