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
import { defaultFees } from '../../lib/constants'
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
  const [showButton, setShowButton] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [settling, setSettling] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (tx) setShowButton(tx.isPending)
  }, [tx?.isPending])

  useEffect(() => {
    setButtonLabel(settling ? 'Settling...' : defaultButtonLabel)
  }, [settling])

  const handleClaim = async () => {
    setError('')
    setSettling(true)
    try {
      await settlePending()
      if (tx) setTxInfo({ ...tx, isPending: false })
    } catch (err) {
      console.log('error settling', typeof err, err)
      setError(extractError(err))
    }
    setSettling(false)
  }

  const handleExplorer = () => {
    if (tx?.roundTxid) openInNewTab(tx.roundTxid, wallet)
  }

  if (!tx) return <></>

  const data = [
    ['When', prettyAgo(tx.createdAt)],
    ['State', tx.isPending ? 'Pending' : 'Settled'],
    ['Date', prettyDate(tx.createdAt)],
    ['Amount', prettyNumber(tx.type === 'sent' ? tx.amount - defaultFees : tx.amount)],
    ['Nework fees', prettyNumber(tx.type === 'sent' ? defaultFees : 0)],
    ['Total', prettyNumber(tx.amount)],
  ]

  return (
    <Container>
      <Content>
        <Title text='Transaction' subtext={tx.type} />
        <Error error={Boolean(error)} text={error} />
        {settling ? (
          <Loading />
        ) : (
          <>
            <Table data={data} />
            <div className='flex justify-center align-middle mt-4' onClick={() => setShowInfo(true)}>
              <TipIcon small />
              <p className='text-sm underline underline-offset-2 cursor-pointer'>What are pending transactions?</p>
            </div>
          </>
        )}
      </Content>
      <ButtonsOnBottom>
        {showButton ? <Button onClick={handleClaim} label={buttonLabel} disabled={settling} /> : null}
        {tx.roundTxid ? <Button onClick={handleExplorer} label='View on explorer' /> : null}
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
      <Modal open={showInfo} onClose={() => setShowInfo(false)}>
        <div className='flex flex-col gap-4 text-left'>
          <p className='font-semibold text-center'>Pending transactions</p>
          <p>This transaction is not yet final.</p>
          <p>The sender can still cancel or redirect it to another recipient.</p>
          <p>Funds will become non-reversible once the transaction is settled.</p>
        </div>
      </Modal>
    </Container>
  )
}
