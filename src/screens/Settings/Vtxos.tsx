import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Content from '../../components/Content'
import Container from '../../components/Container'
import { WalletContext } from '../../providers/wallet'
import Label from '../../components/Label'
import { prettyAgo, prettyNumber } from '../../lib/format'
import Loading from '../../components/Loading'
import NextRecycle from '../../components/NextRecycle'
import { ConfigContext } from '../../providers/config'

export default function Vtxos() {
  const { toggleShowConfig } = useContext(ConfigContext)
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
    <Container>
      <Content>
        <Title text='VTXOs' />
        {recycling ? (
          <Loading text='Recycling your VTXOs require a round, which can take a few seconds' />
        ) : showList ? (
          <div className='flex flex-col'>
            <Label text='Amount and expiration' />
            <div className='flex flex-col gap-2 max-h-80 overflow-auto'>
              {wallet.vtxos.spendable?.map((v) => (
                <div className='border p-2 flex justify-between w-full rounded-md' key={v.txid}>
                  <p className='text-left w-2/5'>{prettyNumber(v.amount)} sats</p>
                  <p className='text-right w-2/5'>{prettyAgo(v.expireAt)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-10'>
            <NextRecycle onClick={() => setShowList(true)} />
            <div className='flex flex-col gap-6'>
              <p>Your VTXOs have a lifetime of 7 days and they need to be recycled prior to expiration.</p>
              <p>The app will try to auto-recycle all VTXOs which expire in less than 24 hours.</p>
            </div>
          </div>
        )}
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleRecycle} label={buttonLabel} disabled={recycling} />
        <Button onClick={toggleShowConfig} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
