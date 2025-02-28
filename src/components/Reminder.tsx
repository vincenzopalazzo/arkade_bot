import { prettyDate } from '../lib/format'
import { IonActionSheet } from '@ionic/react'

interface ReminderProps {
  callback: () => void
  duration: number
  isOpen: boolean
  name: string
  startTime: number
}

export default function Reminder({ callback, duration, name, isOpen, startTime }: ReminderProps) {
  const stringify = (input: Record<string, any>): string => {
    const params = new URLSearchParams()
    Object.keys(input).forEach((key) => {
      const value = input[key]
      if (value != null) params.append(key, value)
    })
    return params.toString().replace(/\+/g, '%20')
  }

  const formatTime = (time: number, format = 'yyyymmddThhmmss'): string => {
    const date = new Date(time * 1000).toISOString() // yyyy-mm-ddThh:mm:ss.000Z
    if (format === 'yyyy-mm-ddThh:mm:ss') {
      return date.slice(0, format.length)
    }
    return date.replace(/[.-]/g, '').replace(/:/g, '').slice(0, format.length)
  }

  const handleApple = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${formatTime(startTime)}
DTEND:${formatTime(startTime + duration)}
SUMMARY:${name}
END:VEVENT
END:VCALENDAR`
    const url = `data:text/calendar;charset=utf8,${encodeURIComponent(icsData)}`
    window.open(url, '_blank')
    callback()
  }

  const handleGoogle = () => {
    const details = {
      text: name,
      details: 'Go to your wallet',
      dates: formatTime(startTime) + '/' + formatTime(startTime + duration),
    }
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&${stringify(details)}`
    window.open(url, '_blank')
    callback()
  }

  const handleOutlook = () => {
    const details = {
      path: '/calendar/action/compose',
      rru: 'addevent',
      startdt: formatTime(startTime, 'yyyy-mm-ddThh:mm:ss'),
      enddt: formatTime(startTime + duration, 'yyyy-mm-ddThh:mm:ss'),
      subject: name,
      body: 'Go to your wallet',
      allday: false,
    }
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints
    const action = isMobile ? 'deeplink' : 'compose'
    const url = `https://outlook.live.com/calendar/0/action/${action}?${stringify(details)}`
    window.open(url, '_blank')
    callback()
  }

  return (
    <IonActionSheet
      onDidDismiss={callback}
      cssClass='my-ion-action-sheet'
      header={name}
      subHeader={prettyDate(startTime)}
      isOpen={isOpen}
      buttons={[
        {
          cssClass: 'reminder-button',
          text: 'Google Calendar',
          handler: handleGoogle,
        },
        {
          cssClass: 'reminder-button',
          text: 'Apple Calendar',
          handler: handleApple,
        },
        {
          cssClass: 'reminder-button',
          text: 'Outlook',
          handler: handleOutlook,
        },
      ]}
    />
  )
}
