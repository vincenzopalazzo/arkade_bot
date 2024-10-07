import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { generateMnemonic } from 'bip39'
import { NavigationContext, Pages } from '../../providers/navigation'
import Content from '../../components/Content'
import { FlowContext } from '../../providers/flow'
import Container from '../../components/Container'
import { getPrivateKeyFromMnemonic } from '../../lib/wallet'
import TipIcon from '../../icons/Tip'
import { privateKeyToNsec } from '../../lib/privateKey'

export default function InitNew() {
  const { navigate } = useContext(NavigationContext)
  const { setInitInfo } = useContext(FlowContext)

  const [privateKey, setPrivateKey] = useState('')
  const [nsec, setNsec] = useState('')

  useEffect(() => {
    if (privateKey) return
    const mnemonic = generateMnemonic()
    getPrivateKeyFromMnemonic(mnemonic).then(setPrivateKey)
  }, [])

  useEffect(() => {
    if (!privateKey) return
    setNsec(privateKeyToNsec(privateKey))
  }, [privateKey])

  const handleCancel = () => navigate(Pages.Init)

  const handleProceed = () => {
    setInitInfo({ privateKey })
    navigate(Pages.InitPassword)
  }

  return (
    <Container>
      <Content>
        <Title text='Your new wallet' subtext='Write down the private key' />
        <div className='flex flex-col gap-4'>
          <p className='border border-1 break-words p-3 w-80 mx-auto'>{nsec}</p>
          <div className='flex justify-center align-middle mt-4'>
            <TipIcon small />
            <p className='text-sm'>You can see it later on Settings &gt; Backup</p>
          </div>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleProceed} label='Continue' />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
