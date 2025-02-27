import { AddToCalendarButton } from 'add-to-calendar-button-react'
import { useContext, useEffect } from 'react'
import { ConfigContext } from '../providers/config'
import { Themes } from '../lib/types'
import { TextSecondary } from './Text'
import { prettyDate } from '../lib/format'
import FlexCol from './FlexCol'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

interface CalendarButtonProps {
  last: number
  name: string
  unix: number
  onSuccess?: () => void
}

export default function CalendarButton({ last, name, unix, onSuccess }: CalendarButtonProps) {
  const { config } = useContext(ConfigContext)

  const options = "'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
  const endDate = new Date((unix + last) * 1000).toISOString().slice(0, 10)
  const endTime = new Date((unix + last) * 1000).toISOString().slice(11, 16)
  const lightMode = config.theme === Themes.Light ? 'light' : 'dark'
  const startDate = new Date(unix * 1000).toISOString().slice(0, 10)
  const startTime = new Date(unix * 1000).toISOString().slice(11, 16)

  // observe dataLayer changes to detect when the event is triggered
  useEffect(() => {
    if (!onSuccess) return // it only makes sense to do this if there is an onSuccess callback

    // function to handle dataLayer changes
    function handleDataLayerChange(mutationsList: any) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const { event, eventCategory } = window.dataLayer[window.dataLayer.length - 1]
          if (event === 'success' && eventCategory === 'Add-to-Calendar-Button') {
            if (onSuccess) setTimeout(() => onSuccess(), 2100)
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
    <FlexCol centered>
      <TextSecondary>{prettyDate(unix)}</TextSecondary>
      <AddToCalendarButton
        name={name}
        options={options}
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        timeZone='currentBrowser'
        forceOverlay
        hideBranding
        lightMode={lightMode}
      />
    </FlexCol>
  )
}
