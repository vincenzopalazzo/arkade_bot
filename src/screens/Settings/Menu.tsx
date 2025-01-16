import { useContext } from 'react'
import ArrowIcon from '../../icons/Arrow'
import Header from '../../components/Header'
import { Options, OptionsContext } from '../../providers/options'
import Text, { TextLabel } from '../../components/Text'
import FlexRow from '../../components/FlexRow'
import Content from '../../components/Content'

export default function Menu() {
  const { setOption, validOptions } = useContext(OptionsContext)

  const border = '1px solid var(--dark10)'

  const gridStyle = {
    borderTop: border,
  }

  const rowStyle = (option: Options) => ({
    alignItems: 'center',
    backgroundColor: option === Options.Reset ? 'var(--redbg)' : 'var(--dark10)',
    borderBottom: border,
    color: option === Options.Reset ? 'var(--white)' : 'var(--dark)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
    width: '100%',
  })

  return (
    <>
      <Header text='Settings' />
      <Content>
        {validOptions().map((op) => (
          <div key={op.section} style={{ marginTop: '1rem' }}>
            <TextLabel>{op.section}</TextLabel>
            <div style={gridStyle}>
              {op.options.map(({ icon, option }) => (
                <div key={option} onClick={() => setOption(option)} style={rowStyle(option)}>
                  <FlexRow>
                    {icon}
                    <Text color={option === Options.Reset ? 'white' : ''} capitalize>
                      {option}
                    </Text>
                  </FlexRow>
                  <ArrowIcon />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Content>
    </>
  )
}
