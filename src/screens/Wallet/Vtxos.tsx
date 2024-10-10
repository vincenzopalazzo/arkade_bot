import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Content from '../../components/Content'
import Container from '../../components/Container'
import { WalletContext } from '../../providers/wallet'
import Label from '../../components/Label'
import { prettyAgo, prettyDate, prettyNumber } from '../../lib/format'
import Loading from '../../components/Loading'

export default function Vtxos() {
  const { navigate } = useContext(NavigationContext)
  const { recycleVtxos, wallet } = useContext(WalletContext)

  const defaultButtonLabel = 'Recycle VTXOs'
  const [buttonLabel, setButtonLabel] = useState(defaultButtonLabel)
  const [recycling, setRecycling] = useState(false)

  const goBackToWallet = () => navigate(Pages.Wallet)

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
        <Title text='VTXOs' subtext={`Next recycle ${prettyDate(wallet.nextRecycle)}`} />
        {recycling ? (
          <Loading />
        ) : (
          <>
            <Label text='Amount and expiration' />
            <div className='flex flex-col gap-2 h-72 overflow-auto'>
              {wallet.vtxos.spendable.map((v) => (
                <div className='border p-2 flex justify-between w-full rounded-md' key={v.txid}>
                  <p className='text-left w-2/5'>{prettyNumber(v.amount)} sats</p>
                  <p className='text-right w-2/5'>{prettyAgo(v.expireAt)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleRecycle} label={buttonLabel} disabled={recycling} />
        <Button onClick={goBackToWallet} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
