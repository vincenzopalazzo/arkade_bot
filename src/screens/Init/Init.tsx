import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Container from '../../components/Container'
import { AspContext } from '../../providers/asp'
import Error from '../../components/Error'
import { generateMnemonic } from 'bip39'
import { getPrivateKeyFromMnemonic } from '../../lib/wallet'
import { FlowContext } from '../../providers/flow'

export default function Init() {
  const { aspInfo } = useContext(AspContext)
  const { setInitInfo } = useContext(FlowContext)
  const { navigate } = useContext(NavigationContext)

  const [error, setError] = useState(false)

  useEffect(() => {
    setError(aspInfo.unreachable)
  }, [aspInfo.unreachable])

  const handleNewWallet = () => {
    const mnemonic = generateMnemonic()
    getPrivateKeyFromMnemonic(mnemonic).then((privateKey) => {
      setInitInfo({ privateKey })
      navigate(Pages.InitPassword)
    })
  }

  const handleOldWallet = () => navigate(Pages.InitOld)

  return (
    <Container>
      <div className='mt-24 max-w-80 md:max-w-full mx-auto'>
        <Title text='Arkade' subtext='Ark wallet PoC' />
        <div className='flex flex-col gap-1 mb-4'>
          <p>Bitcoin transactions that scale</p>
          <p>Extremely beta software</p>
          <p>Signet only</p>
        </div>
        <Error error={error} text='ASP unreachable, try again later' />
      </div>
      <ButtonsOnBottom>
        <Button disabled={error} onClick={handleNewWallet} label='New wallet' />
        <Button disabled={error} onClick={handleOldWallet} label='Restore wallet' />
      </ButtonsOnBottom>
    </Container>
  )
}
