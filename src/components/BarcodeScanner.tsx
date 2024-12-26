import { useRef, useEffect, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'
import { consoleError } from '../lib/logs'

interface BarcodeScannerProps {
  setError: (arg0: string) => void
  setData: (arg0: string) => void
}

export default function BarcodeScanner({ setError, setData }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reader = useRef(new BrowserMultiFormatReader())

  const [stream, setStream] = useState<MediaStream>()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(setStream)
      .catch((err) => {
        consoleError('error getting video stream', err)
      })
  }, [])

  useEffect(() => {
    if (!stream || !videoRef) return
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
            setData(JSON.parse(aux).text.trim())
          }
        },
      )
    })

    return () => {
      readerCurrent.reset()
      if (stream) stream.getTracks().forEach((track) => track.stop())
    }
  }, [stream, videoRef])

  return <video className='aspect-[1/1] mx-auto' ref={videoRef} />
}
