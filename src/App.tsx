import '@ionic/react/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import '@ionic/react/css/palettes/dark.class.css'

import { useContext } from 'react'
import { ConfigContext } from './providers/config'
import { NavigationContext, pageComponent, Pages, Tabs } from './providers/navigation'
import { WalletContext } from './providers/wallet'

import './wasm_exec.js'
import './wasmTypes.d.ts'

import { arrowDownCircle, arrowUpCircle, home, settings } from 'ionicons/icons'
import { IonIcon, IonPage, IonTab, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react'

setupIonicReact()

export default function App() {
  const { wasmLoaded, walletUnlocked, wallet } = useContext(WalletContext)
  const { configLoaded } = useContext(ConfigContext)
  const { navigate, screen, tab } = useContext(NavigationContext)

  const page =
    !configLoaded || !wasmLoaded ? Pages.Loading : wallet.initialized && !walletUnlocked ? Pages.Unlock : screen

  const comp = pageComponent(page)

  return (
    <IonPage>
      {tab === Tabs.None ? (
        comp
      ) : (
        <IonTabs>
          <IonTab tab={Tabs.Home}>{comp}</IonTab>
          <IonTab tab={Tabs.Send}>{comp}</IonTab>
          <IonTab tab={Tabs.Receive}>{comp}</IonTab>
          <IonTab tab={Tabs.Settings}>{comp}</IonTab>
          <IonTabBar slot='bottom'>
            <IonTabButton tab={Tabs.Home} selected={tab === Tabs.Home} onClick={() => navigate(Pages.Wallet)}>
              <IonIcon icon={home} />
              Home
            </IonTabButton>
            <IonTabButton tab={Tabs.Send} selected={tab === Tabs.Send} onClick={() => navigate(Pages.SendForm)}>
              <IonIcon icon={arrowUpCircle} />
              Send
            </IonTabButton>
            <IonTabButton
              tab={Tabs.Receive}
              selected={tab === Tabs.Receive}
              onClick={() => navigate(Pages.ReceiveAmount)}
            >
              <IonIcon icon={arrowDownCircle} />
              Receive
            </IonTabButton>
            <IonTabButton tab={Tabs.Settings} selected={tab === Tabs.Settings} onClick={() => navigate(Pages.Settings)}>
              <IonIcon icon={settings} />
              Settings
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      )}
    </IonPage>
  )
}
