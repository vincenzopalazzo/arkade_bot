import Text from './Text'
import FlexRow from './FlexRow'
import FlexCol from './FlexCol'
import { prettyLongText } from '../lib/format'

export default function Table({ data }: { data: string[][] }) {
  const color = (text: string): string => {
    if (text === 'Settled') return 'green'
    if (text === 'Pending') return 'yellow'
    return 'dark50'
  }

  const numChars = (v: string) => Math.floor((36 - v.length) / 2)

  return (
    <FlexCol gap='0.5rem'>
      {data.map(([title, value]) => (
        <FlexRow between key={`${title}${value}`}>
          <Text>{title}</Text>
          <Text color={color(value)} copy={value}>
            {prettyLongText(value, numChars(title))}
          </Text>
        </FlexRow>
      ))}
    </FlexCol>
  )
}
