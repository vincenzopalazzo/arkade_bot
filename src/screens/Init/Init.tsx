import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import { AspContext } from '../../providers/asp'
import Error from '../../components/Error'
import { generateMnemonic } from 'bip39'
import { getPrivateKeyFromMnemonic } from '../../lib/wallet'
import { FlowContext } from '../../providers/flow'
import Content from '../../components/Content'
import CenterScreen from '../../components/CenterScreen'
import Text from '../../components/Text'
import LogoIcon from '../../icons/Logo'
import FlexCol from '../../components/FlexCols'

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
    <>
      <Content>
        <CenterScreen>
          <LogoIcon big />
          <FlexCol centered gap='0'>
            <Text bigger>Arkade</Text>
            <Text color='dark50'>Ark wallet PoC</Text>
          </FlexCol>
          <Error error={error} text='ASP unreachable, try again later' />
        </CenterScreen>
      </Content>
      <ButtonsOnBottom>
        <Button disabled={error} onClick={handleNewWallet} label='New wallet' />
        <Button disabled={error} onClick={handleOldWallet} label='Restore wallet' />
      </ButtonsOnBottom>
    </>
  )
}
