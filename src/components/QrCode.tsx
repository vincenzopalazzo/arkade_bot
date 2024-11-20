import { prettyLongText } from '../lib/format'
import QRCode from 'react-qr-code'
import Text from './Text'
import Button from './Button'
import CopyIcon from '../icons/Copy'
import { copyToClipboard } from '../lib/clipboard'
import { useState } from 'react'

interface QrCodeProps {
  short?: string
  value: string
}

export default function QrCode({ short, value }: QrCodeProps) {
  const defaultLabel = 'Copy'
  const [buttonLabel, setButtonLabel] = useState(defaultLabel)

  const canCopy = navigator.clipboard && 'writeText' in navigator.clipboard

  const handleCopy = async () => {
    await copyToClipboard(value)
    setButtonLabel('Copied')
    setTimeout(() => setButtonLabel(defaultLabel), 2100)
  }

  return (
    <div className='w-[300px] mx-auto select-none text-center flex flex-col gap-6'>
      {value ? (
        <div className='bg-white p-[10px]'>
          <QRCode size={280} value={value} fgColor='#000000' />
        </div>
      ) : null}
      <Text>{prettyLongText(short ?? value)}</Text>
      {canCopy ? (
        <p>
          <Button icon={<CopyIcon />} label={buttonLabel} onClick={handleCopy} secondary short />
        </p>
      ) : null}
    </div>
  )
}
