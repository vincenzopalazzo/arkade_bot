import { useContext } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { ConfigContext } from '../../providers/config'
import Content from '../../components/Content'
import Container from '../../components/Container'
import { AspContext } from '../../providers/asp'
import Table from '../../components/Table'
import { prettyLongText } from '../../lib/format'

export default function About() {
  const { aspInfo } = useContext(AspContext)
  const { toggleShowConfig } = useContext(ConfigContext)

  const days = Math.round(aspInfo.roundLifetime / 60 / 60 / 24)

  const data = [
    ['Dust', `${aspInfo.dust} sats`],
    ['Min Relay Fee', `${aspInfo.minRelayFee} sats`],
    ['Round Interval', `${aspInfo.roundInterval} secs`],
    ['Round Lifetime', `${days} days`],
    ['Server Pubkey', prettyLongText(aspInfo.pubkey, 10)],
    ['Unilateral Exit Delay', `${aspInfo.unilateralExitDelay} secs`],
    ['URL', aspInfo.url],
  ]

  return (
    <Container>
      <Content>
        <Title text='About' subtext='Ark wallet PoC' />
        <div className='mt-10'>
          <Table data={data} />
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={toggleShowConfig} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
