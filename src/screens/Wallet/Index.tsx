import { useContext, useEffect, useState } from 'react'
import Balance from '../../components/Balance'
import Error from '../../components/Error'
import TransactionsList from '../../components/TransactionsList'
import { WalletContext } from '../../providers/wallet'
import { AspContext } from '../../providers/asp'
import LogoIcon from '../../icons/Logo'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { IframeContext } from '../../providers/iframe'
import Minimal from '../../components/Minimal'
import Text from '../../components/Text'
import FlexCol from '../../components/FlexCol'

export default function Wallet() {
  const { aspInfo } = useContext(AspContext)
  const { iframeUrl } = useContext(IframeContext)
  const { wallet } = useContext(WalletContext)

  const [error, setError] = useState(false)

  useEffect(() => {
    setError(aspInfo.unreachable)
  }, [aspInfo.unreachable])

  if (iframeUrl)
    return (
      <Minimal>
        <FlexCol gap='0'>
          <Text capitalize color='dark50' tiny>
            Balance
          </Text>
          <Text small>{wallet.balance} sats</Text>
        </FlexCol>
      </Minimal>
    )

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
