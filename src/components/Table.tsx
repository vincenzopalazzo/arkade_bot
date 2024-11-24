import Text, { TextSecondary } from './Text'
import FlexRow from './FlexRow'
import FlexCol from './FlexCol'

export default function Table({ data }: { data: string[][] }) {
  return (
    <FlexCol gap='0.5rem'>
      {data.map(([title, value]) => (
        <FlexRow between key={title}>
          <Text>{title}</Text>
          <TextSecondary>{value}</TextSecondary>
        </FlexRow>
      ))}
    </FlexCol>
  )
}
