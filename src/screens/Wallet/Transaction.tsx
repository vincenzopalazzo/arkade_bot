import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Content from '../../components/Content'
import Container from '../../components/Container'
import { WalletContext } from '../../providers/wallet'
import { FlowContext } from '../../providers/flow'
import { prettyAgo, prettyDate, prettyNumber } from '../../lib/format'
import { defaultFee } from '../../lib/constants'
import Table from '../../components/Table'
import Error from '../../components/Error'
import { extractError } from '../../lib/error'
import Loading from '../../components/Loading'
import { openInNewTab } from '../../lib/explorers'
import Modal from '../../components/Modal'
import TipIcon from '../../icons/Tip'

export default function Transaction() {
  const { txInfo, setTxInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { settlePending, wallet } = useContext(WalletContext)

  const tx = txInfo
  const goBackToWallet = () => navigate(Pages.Wallet)
  const defaultButtonLabel = 'Settle pending'

  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [showSettleButton, setShowSettleButton] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [settling, setSettling] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (tx) setShowSettleButton(tx.pending)
  }, [tx?.pending])

  useEffect(() => {
    setButtonLabel(settling ? 'Settling...' : defaultButtonLabel)
  }, [settling])

  const handleSettle = async () => {
    setError('')
    setSettling(true)
    try {
      await settlePending()
      if (tx) setTxInfo({ ...tx, pending: false, settled: true })
    } catch (err) {
      setError(extractError(err))
    }
    setSettling(false)
  }

  const handleExplorer = () => {
    if (tx?.explorable) openInNewTab(tx.explorable, wallet)
  }

  if (!tx) return <></>

  const data = [
    ['State', tx.pending ? 'Pending' : 'Settled'],
    ['When', prettyAgo(tx.createdAt)],
    ['Date', prettyDate(tx.createdAt)],
    ['Origin', tx.boardingTxid ? 'Mainnet' : 'Ark'],
    ['Amount', `${prettyNumber(tx.type === 'sent' ? tx.amount - defaultFee : tx.amount)} sats`],
    ['Network fees', `${prettyNumber(tx.type === 'sent' ? defaultFee : 0)} sats`],
    ['Total', `${prettyNumber(tx.amount)} sats`],
  ]

  return (
    <Container>
      <Content>
        <Title text='Transaction' />
        <Error error={Boolean(error)} text={error} />
        {settling ? (
          <Loading text='Settling transactions require a round, which can take a few seconds' />
        ) : (
          <>
            <Table data={data} />
            {tx.pending ? (
              <div className='flex justify-center align-middle mt-4' onClick={() => setShowInfo(true)}>
                <TipIcon small />
                <p className='text-sm underline underline-offset-2 cursor-pointer'>What are pending transactions?</p>
              </div>
            ) : null}
          </>
        )}
      </Content>
      <ButtonsOnBottom>
        {showSettleButton ? <Button onClick={handleSettle} label={buttonLabel} disabled={settling} /> : null}
        {tx.explorable ? <Button onClick={handleExplorer} label='View on explorer' /> : null}
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
      <Modal open={showInfo} onClose={() => setShowInfo(false)}>
        <div className='flex flex-col gap-4 text-left'>
          <p className='font-semibold text-center'>Pending transactions</p>
          <p>
            This transaction is not yet final. The sender can still cancel or redirect it to another recipient. Funds
            will become non-reversible once the transaction is settled.
          </p>
        </div>
      </Modal>
    </Container>
  )
}
