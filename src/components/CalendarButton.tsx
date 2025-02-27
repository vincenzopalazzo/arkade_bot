import { AddToCalendarButton } from 'add-to-calendar-button-react'
import { useContext, useEffect } from 'react'
import { ConfigContext } from '../providers/config'
import { Themes } from '../lib/types'
import { TextSecondary } from './Text'
import FlexCol from './FlexCol'
import Content from './Content'
import ButtonsOnBottom from './ButtonsOnBottom'
import Button from './Button'
import Header from '../screens/Settings/Header'
import { prettyDate } from '../lib/format'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

interface CalendarButtonProps {
  callback: () => void
  duration: number
  name: string
  startTime: number
}

export default function CalendarButton({ callback, duration, name, startTime }: CalendarButtonProps) {
  const { config } = useContext(ConfigContext)

  // observe dataLayer changes to detect when the event is triggered
  useEffect(() => {
    // function to handle dataLayer changes
    function handleDataLayerChange(mutationsList: any) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const { event, eventCategory } = window.dataLayer[window.dataLayer.length - 1]
          if (event === 'success' && eventCategory === 'Add-to-Calendar-Button') {
            setTimeout(() => {
              window.dataLayer.pop()
              callback()
            }, 2100)
          }
        }
      }
    }

    // create a new MutationObserver instance
    const observer = new MutationObserver(handleDataLayerChange)

    // configure the observer to watch for changes to the dataLayer
    observer.observe(window.document, {
      attributes: false,
      childList: true,
      subtree: true,
      characterData: false,
    })
  }, [])

  return (
    <>
      <Header backFunc={callback} text='Add reminder' />
      <Content>
        <FlexCol centered>
          <TextSecondary>{prettyDate(startTime)}</TextSecondary>
          <AddToCalendarButton
            name={name}
            options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
            endTime={new Date((startTime + duration) * 1000).toISOString().slice(11, 16)}
            endDate={new Date((startTime + duration) * 1000).toISOString().slice(0, 10)}
            startTime={new Date(startTime * 1000).toISOString().slice(11, 16)}
            startDate={new Date(startTime * 1000).toISOString().slice(0, 10)}
            lightMode={config.theme === Themes.Light ? 'light' : 'dark'}
            timeZone='currentBrowser'
            forceOverlay
            hideBranding
          />
        </FlexCol>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={callback} label='Back' secondary />
      </ButtonsOnBottom>
    </>
  )
}
