import { useEffect, useState } from 'react'
import { pasteFromClipboard, queryPastePermission } from '../lib/clipboard'
import Paste from './Paste'

interface ClipboardProps {
  validator?: (arg0: string) => boolean
  onPaste: (arg0: string) => void
}

export default function Clipboard({ validator, onPaste }: ClipboardProps) {
  const [clipboard, setClipboard] = useState('')
  const [showPaste, setShowPaste] = useState(false)

  useEffect(() => {
    queryPastePermission().then((state) => {
      if (state === 'prompt') setShowPaste(true) // to trigger permissions popup
      if (state === 'granted') {
        // if content is valid, show it to user in UI
        pasteFromClipboard().then((data) => {
          if (!data) return
          if (!validator || validator(data)) {
            setClipboard(data)
            setShowPaste(true)
          }
        })
      }
    })
  }, [])

  const onClick = () => {
    if (clipboard) return onPaste(clipboard)
    pasteFromClipboard().then((data) => {
      if (data) onPaste(data)
    })
  }

  return showPaste ? <Paste data={clipboard} onClick={onClick} /> : <></>
}
