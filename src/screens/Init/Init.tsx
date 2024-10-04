import { useContext } from 'react'
import Button from '../../components/Button'
import Title from '../../components/Title'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import { NavigationContext, Pages } from '../../providers/navigation'
import Container from '../../components/Container'

export default function Init() {
  const { navigate } = useContext(NavigationContext)

  return (
    <Container>
      <div className='mt-24 max-w-80 md:max-w-full mx-auto'>
        <Title text='Ark wallet' subtext='Bitcoin transactions that scale' />
        <div className='flex flex-col gap-1'>
          <p>Built with React and Arklabs' SDK</p>
          <p>Extremely beta software</p>
          <p>Signet only</p>
        </div>
      </div>
      <ButtonsOnBottom>
        <Button onClick={() => navigate(Pages.InitNew)} label='New wallet' />
        <Button onClick={() => navigate(Pages.InitOld)} label='Restore wallet' />
      </ButtonsOnBottom>
    </Container>
  )
}
