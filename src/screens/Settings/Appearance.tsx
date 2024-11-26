import { useContext } from 'react'
import { ConfigContext, Themes } from '../../providers/config'
import Content from '../../components/Content'
import Padded from '../../components/Padded'
import Header from './Header'
import { TextLabel, TextSecondary } from '../../components/Text'
import Toggle from '../../components/Toggle'
import FlexCol from '../../components/FlexCols'

export default function Theme() {
  const { config, updateConfig } = useContext(ConfigContext)

  const handleChange = () => {
    const theme = config.theme === Themes.Dark ? Themes.Light : Themes.Dark
    updateConfig({ ...config, theme })
  }

  return (
    <>
      <Header text='Theme' back />
      <Content>
        <FlexCol>
          <FlexCol gap='0.5rem'>
            <TextLabel>Theme</TextLabel>
            <Toggle checked={config.theme === Themes.Dark} onClick={handleChange} text='Dark theme' />
          </FlexCol>
          <Padded>
            <TextSecondary>Dark theme is easier on the eyes</TextSecondary>
          </Padded>
        </FlexCol>
      </Content>
    </>
  )
}
