import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { generateMnemonic } from 'bip39'
import { NavigationContext, Pages } from '../../providers/navigation'
import Padded from '../../components/Padded'
import { FlowContext } from '../../providers/flow'
import Content from '../../components/Content'
import { getPrivateKeyFromMnemonic } from '../../lib/wallet'
import TipIcon from '../../icons/Tip'
import { seedToNsec } from '../../lib/privateKey'
import Textarea from '../../components/Textarea'
import Header from '../../components/Header'

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
    setNsec(seedToNsec(privateKey))
  }, [privateKey])

  const handleCancel = () => navigate(Pages.Init)

  const handleProceed = () => {
    setInitInfo({ privateKey })
    navigate(Pages.InitPassword)
  }

  return (
    <>
      <Header text='Wallet' back={handleCancel} />
      <Content>
        <Padded>
          <Title text='Your new wallet' subtext='Write it in a secure place' />
          <div className='flex flex-col gap-4 mt-10'>
            <Textarea label='Private key' value={nsec} />
            <div className='flex justify-center align-middle mt-4'>
              <TipIcon small />
              <p className='text-sm'>You can see it later on Settings &gt; Backup</p>
            </div>
          </div>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleProceed} label='Continue' />
        <Button onClick={handleCancel} label='Cancel' secondary />
      </ButtonsOnBottom>
    </>
  )
}
