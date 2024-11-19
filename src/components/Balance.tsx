import { useContext } from 'react'
import { prettyNumber } from '../lib/format'
import { Satoshis } from '../lib/types'
import { FiatContext } from '../providers/fiat'
import Text from './Text'

interface BalanceProps {
  sats: Satoshis
}

export default function Balance({ sats }: BalanceProps) {
  const { toUSD } = useContext(FiatContext)

  const text = prettyNumber(sats) + ' sats'
  const fiat = prettyNumber(toUSD(sats), 2) + ' USD'

  return (
    <>
      <Text minititle>My balance</Text>
      <Text emphasys>{text}</Text>
      <Text secondary>{fiat}</Text>
    </>
  )
}
