import Text from './Text'
import FlexRow from './FlexRow'
import FlexCol from './FlexCol'

export default function Table({ data }: { data: string[][] }) {
  return (
    <FlexCol gap='0.5rem'>
      {data.map(([title, value]) => (
        <FlexRow between key={title}>
          <Text>{title}</Text>
          <Text color={value === 'Settled' ? 'green' : 'dark50'}>{value}</Text>
        </FlexRow>
      ))}
    </FlexCol>
  )
}
