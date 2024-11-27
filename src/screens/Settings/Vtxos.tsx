import { ReactNode, useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'
import { prettyAgo, prettyDate, prettyNumber } from '../../lib/format'
import Loading from '../../components/Loading'
import Header from './Header'
import Text from '../../components/Text'
import FlexCol from '../../components/FlexCol'
import { Vtxo } from '../../lib/types'
import FlexRow from '../../components/FlexRow'
import WarningBox from '../../components/Warning'

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

const VtxoLine = ({ vtxo }: { vtxo: Vtxo }) => {
  return (
    <Box>
      <Text>{prettyNumber(vtxo.amount)} sats</Text>
      <Text>{prettyAgo(vtxo.expireAt)}</Text>
    </Box>
  )
}

export default function Vtxos() {
  const { recycleVtxos, wallet } = useContext(WalletContext)

  const defaultButtonLabel = 'Recycle VTXOs now'
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [recycling, setRecycling] = useState(false)
  const [showList, setShowList] = useState(false)

  const handleRecycle = async () => {
    setRecycling(true)
    await recycleVtxos()
    setRecycling(false)
  }

  useEffect(() => {
    setButtonLabel(recycling ? 'Recycling...' : defaultButtonLabel)
  }, [recycling])

  return (
    <>
      <Header text='VTXOs' back all={() => setShowList(!showList)} />
      <Content>
        {recycling ? (
          <Loading text='Recycling your VTXOs require a round, which can take a few seconds' />
        ) : showList ? (
          <Padded>
            <FlexCol gap='0.5rem'>
              <Text smaller>Amount and expiration</Text>
              {wallet.vtxos.spendable?.map((v) => (
                <VtxoLine key={v.txid} vtxo={v} />
              ))}
            </FlexCol>
          </Padded>
        ) : (
          <Padded>
            <FlexCol>
              {wallet.vtxos.spendable?.length > 0 ? (
                <FlexCol gap='0.5rem'>
                  <Text small>Next roll over</Text>
                  <Box>
                    <p>{prettyDate(wallet.nextRecycle)}</p>
                    <p className='mr-2'>{prettyAgo(wallet.nextRecycle)}</p>
                  </Box>
                </FlexCol>
              ) : (
                <WarningBox red text="You don't have any VTXOs" />
              )}
              <Text color='dark50' small wrap>
                Your VTXOs have a lifetime of 7 days and they need to be rolled over prior to expiration.
              </Text>
              <Text color='dark50' small wrap>
                The app will try to auto roll over all VTXOs which expire in less than 24 hours.
              </Text>
            </FlexCol>
          </Padded>
        )}
      </Content>
      <ButtonsOnBottom>
        {wallet.vtxos.spendable?.length > 0 ? (
          <Button onClick={handleRecycle} label={buttonLabel} disabled={recycling} />
        ) : null}
      </ButtonsOnBottom>
    </>
  )
}
