import { useContext } from 'react'
import { AspContext } from '../../providers/asp'
import Header from './Header'
import Table from '../../components/Table'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'

export default function About() {
  const { aspInfo } = useContext(AspContext)
  const { wallet } = useContext(WalletContext)

  const days = Math.round(aspInfo.roundLifetime / 60 / 60 / 24)

  const data = [
    ['Dust', `${aspInfo.dust} sats`],
    ['Forfeit address', aspInfo.forfeitAddress],
    ['Network', aspInfo.network],
    ['Round Interval', `${aspInfo.roundInterval} secs`],
    ['Round Lifetime', `${days} days`],
    ['Server Pubkey', aspInfo.pubkey],
    ['Unilateral Exit Delay', `${aspInfo.unilateralExitDelay} secs`],
    ['URL', aspInfo.url],
    ['WASM version', wallet.wasmVersion],
  ]

  return (
    <>
      <Header text='About' back />
      <Content>
        <Padded>
          <Table data={data} />
        </Padded>
      </Content>
    </>
  )
}
