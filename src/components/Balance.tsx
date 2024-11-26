import { useContext } from 'react'
import { prettyNumber } from '../lib/format'
import { Satoshis } from '../lib/types'
import { FiatContext } from '../providers/fiat'
import Text from './Text'
import FlexCol from './FlexCols'

interface BalanceProps {
  sats: Satoshis
}

export default function Balance({ sats }: BalanceProps) {
  const { toUSD } = useContext(FiatContext)

  const text = prettyNumber(sats) + ' sats'
  const fiat = prettyNumber(toUSD(sats), 2) + ' USD'

  return (
    <FlexCol gap='4px'>
      <Text color='dark80' tiny>
        My balance
      </Text>
      <Text big>{text}</Text>
      <Text color='dark80'>{fiat}</Text>
    </FlexCol>
  )
}
