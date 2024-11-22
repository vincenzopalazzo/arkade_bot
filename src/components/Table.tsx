import { TextNormal, TextSecondary } from './Text'
import FlexRow from './FlexRow'
import FlexCol from './flexCol'

export default function Table({ data }: { data: string[][] }) {
  return (
    <FlexCol gap='0.5rem'>
      {data.map(([title, value]) => (
        <FlexRow between key={title}>
          <TextNormal>{title}</TextNormal>
          <TextSecondary truncate>{value}</TextSecondary>
        </FlexRow>
      ))}
    </FlexCol>
  )
}
