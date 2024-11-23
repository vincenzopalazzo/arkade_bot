import { useEffect, useState } from 'react'
import { pasteFromClipboard } from '../lib/clipboard'
import Paste from './Paste'

interface ClipboardProps {
  validator?: (arg0: string) => boolean
  onPaste: (arg0: string) => void
}

export default function Clipboard({ validator, onPaste }: ClipboardProps) {
  const [clipboard, setClipboard] = useState('')

  useEffect(() => {
    pasteFromClipboard().then((data) => {
      if (!data) return
      if (!validator || validator(data)) setClipboard(data)
    })
  }, [])

  return clipboard ? <Paste data={clipboard} onClick={() => onPaste(clipboard)} /> : <></>
}
