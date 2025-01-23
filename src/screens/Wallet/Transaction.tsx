import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Padded from '../../components/Padded'
import { WalletContext } from '../../providers/wallet'
import { FlowContext } from '../../providers/flow'
import { prettyAgo, prettyDate, prettyNumber } from '../../lib/format'
import { defaultFee } from '../../lib/constants'
import Table from '../../components/Table'
import Error from '../../components/Error'
import { extractError } from '../../lib/error'
import Loading from '../../components/Loading'
import { openInNewTab } from '../../lib/explorers'
import Header from '../../components/Header'
import Content from '../../components/Content'
import Info from '../../components/Info'
import FlexCol from '../../components/FlexCol'

export default function Transaction() {
  const { txInfo, setTxInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { reloadWallet, settlePending, wallet } = useContext(WalletContext)

  const tx = txInfo
  const defaultButtonLabel = 'Settle pending'

  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [showSettleButton, setShowSettleButton] = useState(false)
  const [settleSuccess, setSettleSuccess] = useState(false)
  const [settling, setSettling] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (tx) setShowSettleButton(!tx.settled)
  }, [tx?.settled])

  useEffect(() => {
    setButtonLabel(settling ? 'Settling...' : defaultButtonLabel)
  }, [settling])

  const handleBack = () => {
    reloadWallet()
    navigate(Pages.Wallet)
  }

  const handleExplorer = () => {
    if (tx?.explorable) openInNewTab(tx.explorable, wallet)
  }

  const handleSettle = async () => {
    setError('')
    setSettling(true)
    try {
      await settlePending()
      setSettleSuccess(true)
      if (tx) setTxInfo({ ...tx, pending: false, settled: true })
    } catch (err) {
      setError(extractError(err))
    }
    setSettling(false)
  }

  if (!tx) return <></>

  const data = [
    // ['State', tx.pending ? 'Pending' : 'Settled'],
    ['Kind', tx.type === 'sent' ? 'Sent' : 'Received'],
    ['When', prettyAgo(tx.createdAt)],
    ['Date', prettyDate(tx.createdAt)],
    ['Amount', `${prettyNumber(tx.type === 'sent' ? tx.amount - defaultFee : tx.amount)} sats`],
    ['Network fees', `${prettyNumber(tx.type === 'sent' ? defaultFee : 0)} sats`],
    ['Total', `${prettyNumber(tx.amount)} sats`],
  ]

  return (
    <>
      <Header text='Transaction' back={handleBack} />
      <Content>
        {settling ? (
          <Loading text='Settling transactions requires a round, which can take a few seconds' />
        ) : (
          <Padded>
            <FlexCol>
              {!tx.settled ? (
                <Info
                  color='yellowoutlier'
                  title='Pending'
                  text='This transaction is not yet final. Funds will become non-reversible once the transaction is settled.'
                />
              ) : null}
              {settleSuccess ? <Info color='green' title='Success' text='Your transactions are now settled' /> : null}
              <Error error={Boolean(error)} text={error} />
              <Table data={data} />
            </FlexCol>
          </Padded>
        )}
      </Content>
      <ButtonsOnBottom>
        {showSettleButton ? (
          <Button onClick={handleSettle} label={buttonLabel} disabled={settling} />
        ) : tx.explorable ? (
          <Button onClick={handleExplorer} label='View on explorer' />
        ) : null}
      </ButtonsOnBottom>
    </>
  )
}
