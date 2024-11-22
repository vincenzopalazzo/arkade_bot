import { useContext } from 'react'
import { prettyNumber } from '../lib/format'
import { Satoshis } from '../lib/types'
import { FiatContext } from '../providers/fiat'
import Text, { TextEmphasys, TextMini } from './Text'
import FlexCol from './flexCol'

interface BalanceProps {
  sats: Satoshis
}

export default function Balance({ sats }: BalanceProps) {
  const { toUSD } = useContext(FiatContext)

  const text = prettyNumber(sats) + ' sats'
  const fiat = prettyNumber(toUSD(sats), 2) + ' USD'

  return (
    <FlexCol gap='4px'>
      <TextMini>My balance</TextMini>
      <TextEmphasys>{text}</TextEmphasys>
      <Text color='white80'>{fiat}</Text>
    </FlexCol>
  )
}
