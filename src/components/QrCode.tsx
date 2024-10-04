import { prettyLongText } from '../lib/format'
import QRCode from 'react-qr-code'

interface QrCodeProps {
  short?: string
  value: string
}

export default function QrCode({ short, value }: QrCodeProps) {
  return (
    <div className='w-[300px] mx-auto select-none'>
      {value ? (
        <div className='bg-white p-[10px]'>
          <QRCode size={280} value={value} fgColor='#000000' />
        </div>
      ) : null}
      <p className='mt-4'>{prettyLongText(short ?? value)}</p>
    </div>
  )
}
