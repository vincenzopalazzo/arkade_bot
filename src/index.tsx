import ReactDOM from 'react-dom/client'
import './index.css'
import './ionic.css'
import App from './App'
import { AspProvider } from './providers/asp'
import { ConfigProvider } from './providers/config'
import { FiatProvider } from './providers/fiat'
import { FlowProvider } from './providers/flow'
import { NavigationProvider } from './providers/navigation'
import { NotificationsProvider } from './providers/notifications'
import { WalletProvider } from './providers/wallet'
import { OptionsProvider } from './providers/options'
import { LimitsProvider } from './providers/limits'
import { NudgeProvider } from './providers/nudge'
import { IframeProvider } from './providers/iframe'
import { TelegramProvider } from './providers/telegram'
import * as Sentry from '@sentry/react'
import { LightningProvider } from './providers/lightning'
import { shouldInitializeSentry } from './lib/sentry'

// Initialize Sentry only in production and when DSN is provided
const sentryDsn = import.meta.env.VITE_SENTRY_DSN
if (shouldInitializeSentry(sentryDsn)) {
  Sentry.init({
    dsn: sentryDsn,
    sendDefaultPii: false,
  })
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <TelegramProvider>
    <NavigationProvider>
      <ConfigProvider>
        <AspProvider>
          <NotificationsProvider>
            <FiatProvider>
              <FlowProvider>
                <WalletProvider>
                  <LightningProvider>
                    <LimitsProvider>
                      <OptionsProvider>
                        <NudgeProvider>
                          <IframeProvider>
                            <App />
                          </IframeProvider>
                        </NudgeProvider>
                      </OptionsProvider>
                    </LimitsProvider>
                  </LightningProvider>
                </WalletProvider>
              </FlowProvider>
            </FiatProvider>
          </NotificationsProvider>
        </AspProvider>
      </ConfigProvider>
    </NavigationProvider>
  </TelegramProvider>,
  // </React.StrictMode>,
)
