import { useContext } from 'react'
import ArrowIcon from '../../icons/Arrow'
import Header from '../../components/Header'
import { Options, OptionsContext } from '../../providers/options'
import Text, { TextLabel } from '../../components/Text'
import { IonCol, IonGrid, IonRow } from '@ionic/react'
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
    color: option === Options.Reset ? 'var(--red)' : 'var(--dark)',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
  })

  return (
    <>
      <Header text='Settings' />
      <Content>
        {validOptions().map((op) => (
          <div key={op.section} style={{ marginTop: '1rem' }}>
            <TextLabel>{op.section}</TextLabel>
            <IonGrid class='ion-no-padding' style={gridStyle}>
              {op.options.map(({ icon, option }) => (
                <IonRow key={option} onClick={() => setOption(option)} style={rowStyle(option)}>
                  <IonCol>
                    <FlexRow>
                      {icon}
                      <Text color={option === Options.Reset ? 'red' : ''} capitalize>
                        {option}
                      </Text>
                    </FlexRow>
                  </IonCol>
                  <IonCol size='1'>
                    <ArrowIcon />
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </div>
        ))}
      </Content>
    </>
  )
}
