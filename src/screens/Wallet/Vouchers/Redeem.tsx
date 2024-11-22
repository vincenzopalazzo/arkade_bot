import { useContext, useEffect, useState } from 'react'
import { FlowContext } from '../../../providers/flow'
import Content from '../../../components/Content'
import Padded from '../../../components/Padded'
import Error from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import Button from '../../../components/Button'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { extractError } from '../../../lib/error'
import { redeemNotes } from '../../../lib/asp'
import Details, { DetailsProps } from '../../../components/Details'
import { ArkNote } from '../../../lib/arknote'
import Loading from '../../../components/Loading'
import Header from '../../Settings/Header'

export default function NoteRedeem() {
  const { noteInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)

  const defaultButtonLabel = 'Redeem note'

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
    <>
      <Header text='Redeem note' back />
      <Content>
        <Padded>
          <Error error={Boolean(error)} text={error} />
          {redeeming ? (
            <Loading text='Redeeming require a round, which can take a few seconds' />
          ) : (
            <Details details={details} />
          )}
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleRedeem} label={buttonLabel} disabled={redeeming} />
      </ButtonsOnBottom>
    </>
  )
}
