import { useContext } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { ConfigContext } from '../../providers/config'
import Content from '../../components/Content'
import Container from '../../components/Container'

export default function About() {
  const { toggleShowConfig } = useContext(ConfigContext)

  return (
    <Container>
      <Content>
        <Title text='About' />
        <div className='flex flex-col gap-2'>
          <p>
            Built with React and{' '}
            <a className='underline' href='https://arklabs.to'>
              Arklabs
            </a>{' '}
            SDK
          </p>
          <p>Extremely beta software</p>
          <p>Signet only</p>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={toggleShowConfig} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
