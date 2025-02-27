import { ReactNode, useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'
import { prettyAgo, prettyDate, prettyDelta, prettyHide, prettyNumber } from '../../lib/format'
import Header from './Header'
import Text, { TextSecondary } from '../../components/Text'
import FlexCol from '../../components/FlexCol'
import { Vtxo } from '../../lib/types'
import FlexRow from '../../components/FlexRow'
import WarningBox from '../../components/Warning'
import { ConfigContext } from '../../providers/config'
import { extractError } from '../../lib/error'
import Error from '../../components/Error'
import WaitingForRound from '../../components/WaitingForRound'
import { sleep } from '../../lib/sleep'
import { AspContext } from '../../providers/asp'
import CalendarButton from '../../components/CalendarButton'

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
  const { aspInfo, bestMarketHour } = useContext(AspContext)
  const { config } = useContext(ConfigContext)
  const { rolloverVtxos, wallet } = useContext(WalletContext)

  const defaultLabel = 'Roll over VTXOs now'

  const [error, setError] = useState('')
  const [label, setLabel] = useState(defaultLabel)
  const [rollingover, setRollingover] = useState(false)
  const [showCalendarButton, setShowCalendarButton] = useState(false)
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    setLabel(rollingover ? 'Rolling over...' : defaultLabel)
  }, [rollingover])

  const handleAddReminder = () => {
    setShowCalendarButton(true)
  }

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

  const { prettyDuration, prettyIn, startTime } = bestMarketHour(wallet.nextRollover)

  const clickableDate = (unix: number) => (
    <strong onClick={() => setShowCalendarButton(true)}>{prettyDate(unix)}</strong>
  )

  if (showCalendarButton)
    return (
      <CalendarButton
        marketHour={bestMarketHour(wallet.nextRollover)}
        name='VTXOs rollover'
        callback={() => setShowCalendarButton(false)}
      />
    )

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
          <WaitingForRound rollover />
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
                  <TextSecondary>Your oldest VTXO will expire {prettyAgo(wallet.nextRollover)}.</TextSecondary>
                  <TextSecondary>
                    Your VTXOs have a lifetime of {prettyDelta(aspInfo.vtxoTreeExpiry)} and they need to be rolled over
                    prior to expiration.
                  </TextSecondary>
                  <TextSecondary>
                    The app will try to auto roll over all VTXOs which expire in less than 24 hours.
                  </TextSecondary>
                  <TextSecondary>You can settle it at the best market hour for lower fees.</TextSecondary>
                  <TextSecondary>
                    Best market hour starts at {clickableDate(startTime)} ({prettyIn}) and lasts for {prettyDuration}.
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
        {wallet.nextRollover ? <Button onClick={handleAddReminder} label='Add reminder' secondary /> : null}
      </ButtonsOnBottom>
    </>
  )
}
