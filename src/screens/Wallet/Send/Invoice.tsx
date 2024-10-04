import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import BarcodeScanner from '../../../components/BarcodeScanner'
import ShowError from '../../../components/Error'
import ButtonsOnBottom from '../../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../../providers/navigation'
import { FlowContext, emptySendInfo } from '../../../providers/flow'
import Input from '../../../components/Input'
import Content from '../../../components/Content'
import Title from '../../../components/Title'
import Container from '../../../components/Container'
import { pasteFromClipboard } from '../../../lib/clipboard'
import { decodeArkAddress } from '../../../lib/address'
import { AspContext } from '../../../providers/asp'
import * as bip21 from '../../../lib/bip21'

export default function SendInvoice() {
  const { aspInfo } = useContext(AspContext)
  const { navigate } = useContext(NavigationContext)
  const { setSendInfo } = useContext(FlowContext)

  const defaultLabel = 'Paste address or invoice'
  const [buttonLabel, setButtonLabel] = useState(defaultLabel)
  const [cameraAllowed, setCameraAllowed] = useState(false)
  const [error, setError] = useState('')
  const [pastedData, setPastedData] = useState('')

  // Firefox doesn't support navigator.clipboard.readText()
  const firefox = !navigator.clipboard || !('readText' in navigator.clipboard)

  useEffect(() => {
    navigator.permissions.query({ name: 'camera' as PermissionName }).then((x) => {
      if (x.state !== 'denied') setCameraAllowed(true)
    })
  })

  useEffect(() => {
    if (!pastedData) return
    setError('')
    if (bip21.isBip21(pastedData)) {
      const { address, amount, arkAddress } = bip21.decode(pastedData)
      if (arkAddress) {
        setSendInfo({ arkAddress, satoshis: amount ?? 0 })
        return navigate(amount ? Pages.SendDetails : Pages.SendAmount)
      }
      if (address) {
        setSendInfo({ address, satoshis: amount ?? 0 })
        return navigate(amount ? Pages.SendDetails : Pages.SendAmount)
      }
      setError('Unable to parse bip21')
      return
    }
    if (/^t*ark1/.test(pastedData)) {
      const { aspKey } = decodeArkAddress(pastedData)
      if (aspKey !== aspInfo.pubkey) {
        setError('Invalid ASP pubkey')
        return
      }
      setSendInfo({ arkAddress: pastedData })
      return navigate(Pages.SendAmount)
    } else {
      setSendInfo({ address: pastedData })
      return navigate(Pages.SendAmount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastedData])

  const handlePaste = async () => {
    const pastedData = await pasteFromClipboard()
    setButtonLabel('Pasted')
    setTimeout(() => setButtonLabel(defaultLabel), 2100)
    setPastedData(pastedData.toLowerCase())
  }

  const handleCancel = () => {
    setSendInfo(emptySendInfo)
    navigate(Pages.Wallet)
  }

  const handleChange = (e: any) => setPastedData(e.target.value)

  return (
    <Container>
      <Content>
        <Title text='Send' subtext='Scan or paste address' />
        <div className='flex flex-col gap-2'>
          <ShowError error={Boolean(error)} text={error} />
          {error ? null : (
            <div className='flex flex-col h-full justify-between'>
              {firefox ? (
                <Input label='Paste your invoice here' left='&#9889;' onChange={handleChange} />
              ) : cameraAllowed ? (
                <BarcodeScanner setPastedData={setPastedData} setError={setError} />
              ) : null}
            </div>
          )}
        </div>
      </Content>
      <ButtonsOnBottom>
        {!firefox && <Button onClick={handlePaste} label={buttonLabel} />}
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
