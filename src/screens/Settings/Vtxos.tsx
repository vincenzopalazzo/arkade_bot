import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Padded from '../../components/Padded'
import Content from '../../components/Content'
import { WalletContext } from '../../providers/wallet'
import { prettyAgo, prettyNumber } from '../../lib/format'
import Loading from '../../components/Loading'
import NextRecycle from '../../components/NextRecycle'
import Error from '../../components/Error'
import Header from './Header'
import { TextLabel } from '../../components/Text'

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
      <Header text='VTXOs' back />
      <Content>
        <Padded>
          {recycling ? (
            <Loading text='Recycling your VTXOs require a round, which can take a few seconds' />
          ) : showList ? (
            <div className='flex flex-col'>
              <TextLabel>Amount and expiration</TextLabel>
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
              {wallet.vtxos.spendable?.length > 0 ? (
                <NextRecycle onClick={() => setShowList(true)} />
              ) : (
                <Error error text="You don't have any VTXOs" />
              )}
              <p>Your VTXOs have a lifetime of 7 days and they need to be rolled over prior to expiration.</p>
              <p>The app will try to auto roll over all VTXOs which expire in less than 24 hours.</p>
            </div>
          )}
        </Padded>
      </Content>
      <ButtonsOnBottom>
        {wallet.vtxos.spendable?.length > 0 ? (
          <Button onClick={handleRecycle} label={buttonLabel} disabled={recycling} />
        ) : null}
      </ButtonsOnBottom>
    </>
  )
}
