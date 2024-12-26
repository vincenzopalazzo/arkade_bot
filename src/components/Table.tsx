import Text from './Text'
import FlexRow from './FlexRow'
import FlexCol from './FlexCol'

export default function Table({ data }: { data: string[][] }) {
  const color = (text: string): string => {
    if (text === 'Settled') return 'green'
    if (text === 'Pending') return 'yellow'
    return 'dark50'
  }

  const key = (t: string, v: string) => `${t}${v}`

  return (
    <FlexCol gap='0.5rem'>
      {data.map(([title, value]) => (
        <FlexRow between key={key(title, value)}>
          <Text>{title}</Text>
          <Text color={color(value)}>{value}</Text>
        </FlexRow>
      ))}
    </FlexCol>
  )
}
