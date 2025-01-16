import { useContext } from 'react'
import { prettyHide, prettyNumber } from '../lib/format'
import { Satoshis } from '../lib/types'
import { FiatContext } from '../providers/fiat'
import Text from './Text'
import FlexCol from './FlexCol'
import FlexRow from './FlexRow'
import EyeIcon from '../icons/Eye'
import { ConfigContext } from '../providers/config'

interface BalanceProps {
  amount: Satoshis
}

export default function Balance({ amount }: BalanceProps) {
  const { config, updateConfig } = useContext(ConfigContext)
  const { toUSD } = useContext(FiatContext)

  const sats = prettyNumber(amount)
  const fiat = prettyNumber(toUSD(amount), 2)

  const satsBalance = (config.showBalance ? sats : prettyHide(sats)) + ' sats'
  const fiatBalance = (config.showBalance ? fiat : prettyHide(fiat)) + ' USD'

  const toggleShow = () => updateConfig({ ...config, showBalance: !config.showBalance })

  return (
    <FlexCol gap='4px' margin='3rem 0 0 0'>
      <Text color='dark50' smaller>
        My balance
      </Text>
      <FlexRow onClick={toggleShow}>
        <Text bigger>{satsBalance}</Text>
        <EyeIcon />
      </FlexRow>
      <Text color='dark80'>{fiatBalance}</Text>
    </FlexCol>
  )
}
