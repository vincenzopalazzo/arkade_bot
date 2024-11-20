import { ReactNode, createContext, useEffect, useState } from 'react'
import { clearStorage, readConfigFromStorage, saveConfigToStorage } from '../lib/storage'
import { defaultAsp } from '../lib/constants'

export enum Themes {
  Dark = 'Dark',
  Light = 'Light',
}

export enum Unit {
  BTC = 'btc',
  EUR = 'eur',
  USD = 'usd',
  SAT = 'sat',
}

export interface Config {
  aspUrl: string
  nostr: boolean
  notifications: boolean
  npub: string
  theme: Themes
  unit: Unit
}

const defaultConfig: Config = {
  aspUrl: defaultAsp,
  nostr: false,
  notifications: false,
  npub: '',
  theme: Themes.Dark,
  unit: Unit.BTC,
}

interface ConfigContextProps {
  config: Config
  configLoaded: boolean
  resetConfig: () => void
  showConfig: boolean
  toggleShowConfig: () => void
  updateConfig: (c: Config) => void
}

export const ConfigContext = createContext<ConfigContextProps>({
  config: defaultConfig,
  configLoaded: false,
  resetConfig: () => {},
  showConfig: false,
  toggleShowConfig: () => {},
  updateConfig: () => {},
})

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>(defaultConfig)
  const [configLoaded, setConfigLoaded] = useState(false)
  const [showConfig, setShowConfig] = useState(false)

  const toggleShowConfig = () => setShowConfig(!showConfig)

  const preferredTheme = () =>
    window?.matchMedia?.('(prefers-color-scheme: dark)').matches ? Themes.Dark : Themes.Light

  const updateConfig = (data: Config) => {
    setConfig(data)
    updateTheme(data)
    saveConfigToStorage(data)
  }

  const updateTheme = ({ theme }: Config) => {
    const className = 'ion-palette-dark'
    const root = document.documentElement
    if (theme === Themes.Dark) root.classList.add(className)
    else root.classList.remove(className)
  }

  const resetConfig = () => {
    clearStorage()
    updateConfig(defaultConfig)
  }

  useEffect(() => {
    if (configLoaded) return
    const config = readConfigFromStorage() ?? { ...defaultConfig, theme: preferredTheme() }
    updateConfig(config)
    setConfigLoaded(true)
  }, [configLoaded])

  return (
    <ConfigContext.Provider value={{ config, configLoaded, resetConfig, showConfig, toggleShowConfig, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}
