import { useContext, useEffect, useState } from 'react'
import { FlowContext } from '../../../providers/flow'
import Container from '../../../components/Container'
import Content from '../../../components/Content'
import Title from '../../../components/Title'
import Error from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import Button from '../../../components/Button'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { extractError } from '../../../lib/error'
import { redeemNotes } from '../../../lib/asp'
import Details, { DetailsProps } from '../../../components/Details'
import { ArkNote } from '../../../lib/arknote'
import Loading from '../../../components/Loading'

export default function NoteRedeem() {
  const { noteInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)

  const defaultButtonLabel = 'Redeem voucher'

  const [details, setDetails] = useState<DetailsProps>()
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [error, setError] = useState('')
  const [redeeming, setRedeeming] = useState(false)

  useEffect(() => {
    setButtonLabel(redeeming ? 'Redeeming...' : defaultButtonLabel)
  }, [redeeming])

  useEffect(() => {
    if (!noteInfo.note) return
    const { value } = ArkNote.fromString(noteInfo.note).data
    setDetails({
      arknote: noteInfo.note,
      satoshis: value,
    })
  }, [noteInfo.note])

  const handleRedeem = async () => {
    setError('')
    setRedeeming(true)
    try {
      await redeemNotes([noteInfo.note])
      navigate(Pages.NoteSuccess)
    } catch (err) {
      setError(extractError(err))
    }
    setRedeeming(false)
  }

  return (
    <Container>
      <Content>
        <Title text='Voucher' subtext='Redeem for a VTXO' />
        <div className='flex flex-col gap-2 mt-4'>
          <Error error={Boolean(error)} text={error} />
          {redeeming ? (
            <Loading text='Redeeming require a round, which can take a few seconds' />
          ) : (
            <Details details={details} />
          )}
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleRedeem} label={buttonLabel} disabled={redeeming} />
        <Button onClick={() => navigate(Pages.Wallet)} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
