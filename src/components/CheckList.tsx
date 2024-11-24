import CheckedIcon from '../icons/Checked'
import UnheckedIcon from '../icons/Unchecked'
import FlexRow from './FlexRow'
import Text from './Text'

type CheckListData = {
  text: string
  done: boolean
}

interface CheckListProps {
  data: CheckListData[]
}

const Line = ({ row }: { row: CheckListData }) => (
  <>
    {row.done ? (
      <FlexRow>
        <CheckedIcon />
        <Text small color='green'>
          {row.text}
        </Text>
      </FlexRow>
    ) : (
      <FlexRow>
        <UnheckedIcon />
        <Text small color='dark70'>
          {row.text}
        </Text>
      </FlexRow>
    )}
  </>
)

export default function CheckList({ data }: CheckListProps) {
  return (
    <>
      {data.map((row) => (
        <Line key={row.text} row={row} />
      ))}
    </>
  )
}
