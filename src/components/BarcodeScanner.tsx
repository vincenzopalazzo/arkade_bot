import { useRef, useEffect, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'

interface BarcodeScannerProps {
  setError: (arg0: string) => void
  setPastedData: (arg0: string) => void
}

export default function BarcodeScanner({ setError, setPastedData }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [granted, setGranted] = useState(false)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setGranted(true))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (!granted) return
    const reader = useRef(new BrowserMultiFormatReader())
    const readerCurrent = reader.current
    reader.current.listVideoInputDevices().then((list) => {
      if (!videoRef.current || list.length === 0) {
        setError('Qr code reader unavailable')
        return
      }
      readerCurrent.decodeFromConstraints(
        {
          audio: false,
          video: {
            facingMode: 'environment',
          },
        },
        videoRef.current,
        (result) => {
          if (result) {
            const aux = JSON.stringify(result)
            setPastedData(JSON.parse(aux).text.trim())
          }
        },
      )
    })

    return () => {
      readerCurrent.reset()
    }
  }, [granted, videoRef])

  return <video className='aspect-[1/1] mx-auto mb-2' ref={videoRef} />
}
