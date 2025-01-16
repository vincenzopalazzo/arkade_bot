import { useContext } from 'react'
import { AspContext } from '../../providers/asp'
import Header from './Header'
import Table from '../../components/Table'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'
import { gitCommit } from '../../_gitCommit'

export default function About() {
  const { aspInfo } = useContext(AspContext)
  const { wallet } = useContext(WalletContext)

  const days = Math.round(aspInfo.roundLifetime / 60 / 60 / 24)

  const data = [
    ['Dust', `${aspInfo.dust} sats`],
    ['Forfeit address', aspInfo.forfeitAddress],
    ['Network', aspInfo.network],
    ['Round interval', `${aspInfo.roundInterval} secs`],
    ['Round lifetime', `${days} days`],
    ['Server pubkey', aspInfo.pubkey],
    ['Server URL', aspInfo.url],
    ['Unilateral exit delay', `${aspInfo.unilateralExitDelay} secs`],
    ['WASM version', wallet.wasmVersion],
    ['Git commit hash', gitCommit],
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
