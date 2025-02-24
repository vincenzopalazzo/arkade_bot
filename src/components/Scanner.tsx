import Button from './Button'
import ButtonsOnBottom from './ButtonsOnBottom'
import Content from './Content'
import Header from './Header'
import Padded from './Padded'
import { QRCanvas, frameLoop, frontalCamera } from '@paulmillr/qr/dom.js'
import { useRef, useEffect } from 'react'

interface ScannerProps {
  close: () => void
  label: string
  setData: (arg0: string) => void
  setError: (arg0: string) => void
}

export default function Scanner({ close, label, setData }: ScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  let camera: any
  let canvas: QRCanvas
  let cancel: () => void

  useEffect(() => {
    const start = async () => {
      if (!videoRef.current) return
      try {
        if (canvas) canvas.clear()
        canvas = new QRCanvas()
        camera = await frontalCamera(videoRef.current)
        const devices = await camera.listDevices()
        await camera.setDevice(devices[devices.length - 1].deviceId)
        cancel = frameLoop(() => {
          const res = camera.readFrame(canvas)
          if (res) {
            setData(res)
            handleClose()
          }
        })
      } catch {}
    }

    start()

    return () => handleClose()
  }, [videoRef])

  const handleClose = () => {
    cancel()
    camera?.stop()
    close()
  }

  return (
    <>
      <Header text={label} back={handleClose} />
      <Content>
        <Padded>
          <video style={{ aspectRatio: '1/1', margin: '0 auto' }} ref={videoRef} />
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={handleClose} label='Cancel' />
      </ButtonsOnBottom>
    </>
  )
}
