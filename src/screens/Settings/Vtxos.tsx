import { ReactNode, useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'
import { prettyAgo, prettyDate, prettyHide, prettyNumber } from '../../lib/format'
import Header from './Header'
import Text, { TextSecondary } from '../../components/Text'
import FlexCol from '../../components/FlexCol'
import { Vtxo } from '../../lib/types'
import FlexRow from '../../components/FlexRow'
import WarningBox from '../../components/Warning'
import { ConfigContext } from '../../providers/config'
import { extractError } from '../../lib/error'
import Error from '../../components/Error'
import Settling from '../../components/Settling'
import { sleep } from '../../lib/sleep'

const Box = ({ children }: { children: ReactNode }) => {
  const style = {
    backgroundColor: 'var(--dark10)',
    border: '1px solid var(--dark20)',
    borderRadius: '0.25rem',
    padding: '0.5rem',
    width: '100%',
  }
  return (
    <div style={style}>
      <FlexRow between>{children}</FlexRow>
    </div>
  )
}

const VtxoLine = ({ hide, vtxo }: { hide: boolean; vtxo: Vtxo }) => {
  const amount = hide ? prettyHide(vtxo.amount) : prettyNumber(vtxo.amount)
  return (
    <Box>
      <Text>{amount} sats</Text>
      <Text>{prettyAgo(vtxo.expireAt)}</Text>
    </Box>
  )
}

export default function Vtxos() {
  const { config } = useContext(ConfigContext)
  const { rolloverVtxos, wallet } = useContext(WalletContext)

  const defaultLabel = 'Roll over VTXOs now'

  const [error, setError] = useState('')
  const [label, setLabel] = useState(defaultLabel)
  const [rollingover, setRollingover] = useState(false)
  const [showList, setShowList] = useState(false)

  const handleRollover = async () => {
    try {
      setRollingover(true)
      await rolloverVtxos(true)
      await sleep(2000) // give time to read last message
      setRollingover(false)
    } catch (err) {
      setError(extractError(err))
      setRollingover(false)
    }
  }

  useEffect(() => {
    setLabel(rollingover ? 'Rolling over...' : defaultLabel)
  }, [rollingover])

  return (
    <>
      <Header
        auxFunc={() => setShowList(!showList)}
        auxText={showList ? 'Date' : 'VTXOs'}
        back
        text={showList ? 'VTXOs list' : 'Next roll over'}
      />
      <Content>
        {rollingover ? (
          <Settling />
        ) : showList ? (
          <Padded>
            <FlexCol gap='0.5rem'>
              <Error error={Boolean(error)} text={error} />
              <Text capitalize color='dark50' smaller>
                Your VTXOs with amount and expiration
              </Text>
              {wallet.vtxos.spendable?.map((v) => (
                <VtxoLine key={v.txid} hide={!config.showBalance} vtxo={v} />
              ))}
            </FlexCol>
          </Padded>
        ) : (
          <Padded>
            {wallet.vtxos.spendable?.length > 0 ? (
              <>
                <FlexCol gap='0.5rem' margin='0 0 1rem 0'>
                  <Error error={Boolean(error)} text={error} />
                  <Text capitalize color='dark50' smaller>
                    Next roll over
                  </Text>
                  <Box>
                    <Text>{prettyDate(wallet.nextRollover)}</Text>
                    <Text>{prettyAgo(wallet.nextRollover)}</Text>
                  </Box>
                </FlexCol>
                <FlexCol gap='0.5rem' margin='2rem 0 0 0'>
                  <TextSecondary>Your oldest VTXO will expire {prettyAgo(wallet.nextRollover, true)}.</TextSecondary>
                  <TextSecondary>
                    Your VTXOs have a lifetime of 7 days and they need to be rolled over prior to expiration.
                  </TextSecondary>
                  <TextSecondary>
                    The app will try to auto roll over all VTXOs which expire in less than 24 hours.
                  </TextSecondary>
                </FlexCol>
              </>
            ) : (
              <WarningBox red text="You don't have any VTXOs" />
            )}
          </Padded>
        )}
      </Content>
      <ButtonsOnBottom>
        {wallet.vtxos.spendable?.length > 0 ? (
          <Button onClick={handleRollover} label={label} disabled={rollingover} />
        ) : null}
      </ButtonsOnBottom>
    </>
  )
}
