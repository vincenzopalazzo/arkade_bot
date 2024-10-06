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

export default function Transaction() {
  const { txInfo, setTxInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)
  const { settlePending } = useContext(WalletContext)

  const goBackToWallet = () => navigate(Pages.Wallet)
  const defaultButtonLabel = 'Settle pending'

  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [error, setError] = useState('')
  const [showButton, setShowButton] = useState(false)
  const [settling, setSettling] = useState(false)

  useEffect(() => {
    if (!txInfo) return
    setShowButton(txInfo.isPending)
  }, [txInfo?.isPending])

  useEffect(() => {
    setButtonLabel(settling ? 'Settling...' : defaultButtonLabel)
  }, [settling])

  const handleClaim = async () => {
    setError('')
    setSettling(true)
    try {
      await settlePending()
      if (txInfo) setTxInfo({ ...txInfo, isPending: false })
    } catch (err) {
      console.log('error settling', err)
      setError(extractError(err))
    }
    setSettling(false)
  }

  if (!txInfo) return <></>

  const tx = txInfo

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
        {settling ? <Loading /> : <Table data={data} />}
      </Content>
      <ButtonsOnBottom>
        {showButton ? <Button onClick={handleClaim} label={buttonLabel} disabled={settling} /> : null}
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
