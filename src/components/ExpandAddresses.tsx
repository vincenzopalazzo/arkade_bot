import { useState } from 'react'
import Text, { TextSecondary } from './Text'
import { prettyLongText } from '../lib/format'
import ChevronDownIcon from '../icons/ChevronDown'
import ChevronUpIcon from '../icons/ChevronUp'
import CopyIcon from '../icons/Copy'
import FlexCol from './FlexCol'
import FlexRow from './FlexRow'
import Shadow from './Shadow'
import { copyToClipboard } from '../lib/clipboard'
import CheckMarkIcon from '../icons/CheckMark'

interface ExpandAddressesProps {
  bip21uri: string
  boardingAddr: string
  offchainAddr: string
}

export default function ExpandAddresses({ bip21uri, boardingAddr, offchainAddr }: ExpandAddressesProps) {
  const [copied, setCopied] = useState('')
  const [expand, setExpand] = useState(false)

  const handleCopy = async (value: string) => {
    await copyToClipboard(value)
    setCopied(value)
  }

  const handleExpand = () => {
    if (!expand) handleCopy(bip21uri)
    setExpand(!expand)
  }

  const ExpandLine = ({ title, value }: { title: string; value: string }) => (
    <FlexRow between>
      <FlexCol gap='0'>
        <TextSecondary>{title}</TextSecondary>
        <Text>{prettyLongText(value, 10)}</Text>
      </FlexCol>
      <Shadow flex onClick={() => handleCopy(value)}>
        {copied === value ? <CheckMarkIcon /> : <CopyIcon />}
      </Shadow>
    </FlexRow>
  )

  return (
    <>
      <Shadow>
        <FlexRow between onClick={handleExpand}>
          <Text>Copy address</Text>
          {expand ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </FlexRow>
      </Shadow>
      {expand ? (
        <div style={{ padding: '0 0.5rem', width: '100%' }}>
          <FlexCol gap='0.21rem'>
            <ExpandLine title='BIP21' value={bip21uri} />
            <ExpandLine title='BTC address' value={boardingAddr} />
            <ExpandLine title='Ark address' value={offchainAddr} />
          </FlexCol>
        </div>
      ) : null}
    </>
  )
}
