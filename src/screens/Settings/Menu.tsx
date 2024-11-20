import { useContext } from 'react'
import ArrowIcon from '../../icons/Arrow'
import Header from '../../components/Header'
import { Options, OptionsContext } from '../../providers/options'
import Content from '../../components/Content'
import Text from '../../components/Text'
import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react'
import FlexRow from '../../components/FlexRow'

export default function Menu() {
  const { setOption, validOptions } = useContext(OptionsContext)

  const rowStyle = (option: Options) => {
    const backgroundColor = option === Options.Reset ? '#f33' : '#333'
    return { backgroundColor, padding: '0.5rem' }
  }

  return (
    <>
      <Header text='Settings' />
      <IonContent>
        {validOptions().map((op) => (
          <div key={op.section}>
            <Content>
              <Text secondary>{op.section}</Text>
            </Content>
            <IonGrid class='ion-no-padding'>
              {op.options.map(({ icon, option }) => (
                <IonRow class='ion-align-items-center' onClick={() => setOption(option)} style={rowStyle(option)}>
                  <IonCol>
                    <FlexRow>
                      {icon}
                      <Text capitalize>{option}</Text>
                    </FlexRow>
                  </IonCol>
                  <IonCol size='1'>
                    <ArrowIcon small />
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </div>
        ))}
      </IonContent>
    </>
  )
}
