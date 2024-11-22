import { useContext } from 'react'
import { ConfigContext, Themes } from '../../providers/config'
import Select from '../../components/Select'
import Content from '../../components/Content'
import Padded from '../../components/Padded'
import Header from './Header'

export default function Theme() {
  const { config, updateConfig } = useContext(ConfigContext)

  const handleChange = (e: any) => {
    updateConfig({ ...config, theme: e.target.value })
  }

  return (
    <>
      <Header text='Theme' back />
      <Content>
        <Padded>
          <div className='flex flex-col gap-10 mt-10'>
            <Select onChange={handleChange} value={config.theme}>
              <option value={Themes.Dark}>{Themes.Dark}</option>
              <option value={Themes.Light}>{Themes.Light}</option>
            </Select>
            <p>Dark theme is easier on the eyes</p>
          </div>
        </Padded>
      </Content>
    </>
  )
}
