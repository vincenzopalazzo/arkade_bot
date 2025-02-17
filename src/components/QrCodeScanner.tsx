import { useRef, useEffect } from 'react'
import { consoleError } from '../lib/logs'
import { QRCanvas, frontalCamera } from '@paulmillr/qr/dom.js'
import { sleep } from '../lib/sleep'

interface QrCodeScannerProps {
  close: () => void
  setError: (arg0: string) => void
  setData: (arg0: string) => void
}

export default function QrCodeScanner({ close, setError, setData }: QrCodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let camera: any

    const start = async () => {
      if (!videoRef.current) return
      try {
        const canvas = new QRCanvas()
        const camera = await frontalCamera(videoRef.current)
        const devices = await camera.listDevices()
        await camera.setDevice(devices[0].deviceId)
        while (true) {
          const res = camera.readFrame(canvas)
          if (res) {
            camera?.stop()
            setData(res)
            close()
            break
          }
          await sleep(100)
        }
      } catch (err) {
        consoleError(err, 'error getting video stream')
        setError('Qr code reader unavailable')
      }
    }

    start()

    return () => camera?.stop()
  }, [videoRef])

  return <video style={{ aspectRatio: '1/1', margin: '0 auto' }} ref={videoRef} />
}
