import { useContext } from 'react'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import Title from '../../components/Title'
import { ConfigContext, Themes } from '../../providers/config'
import Select from '../../components/Select'
import Container from '../../components/Container'
import Content from '../../components/Content'

export default function Theme() {
  const { config, toggleShowConfig, updateConfig } = useContext(ConfigContext)

  const handleChange = (e: any) => {
    updateConfig({ ...config, theme: e.target.value })
  }

  return (
    <Container>
      <Content>
        <Title text='Theme' subtext='Choose your theme' />
        <div className='flex flex-col gap-10 mt-10'>
          <Select onChange={handleChange} value={config.theme}>
            <option value={Themes.Dark}>{Themes.Dark}</option>
            <option value={Themes.Light}>{Themes.Light}</option>
          </Select>
          <p>Dark theme is easier on the eyes</p>
        </div>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={toggleShowConfig} label='Back to wallet' secondary />
      </ButtonsOnBottom>
    </Container>
  )
}
