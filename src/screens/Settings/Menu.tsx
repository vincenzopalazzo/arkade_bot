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

  const gridStyle = {
    borderTop: '1px solid #FBFBFB50',
  }

  const rowStyle = (option: Options) => ({
    backgroundColor: option === Options.Reset ? '#380008' : '#333',
    borderBottom: '1px solid #FBFBFB1A',
    color: option === Options.Reset ? '#FF4F4F' : '#FBFBFB',
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
                <IonRow class='ion-align-items-center' onClick={() => setOption(option)} style={rowStyle(option)}>
                  <IonCol>
                    <FlexRow>
                      {icon}
                      <Text color={option === Options.Reset ? 'red' : 'white100'} capitalize>
                        {option}
                      </Text>
                    </FlexRow>
                  </IonCol>
                  <IonCol size='1'>
                    <ArrowIcon tiny />
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
