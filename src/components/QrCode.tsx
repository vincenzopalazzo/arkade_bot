import QRCode from 'react-qr-code'
import FlexCol from './FlexCol'

interface QrCodeProps {
  value: string
}

export default function QrCode({ value }: QrCodeProps) {
  return (
    <FlexCol centered>
      {value ? (
        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
          <QRCode size={280} value={value} fgColor='#000000' />
        </div>
      ) : null}
    </FlexCol>
  )
}
