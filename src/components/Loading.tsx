import LoadingIcon from '../icons/Loading'
import CenterScreen from './CenterScreen'
import Text from './Text'

export default function Loading({ text }: { text?: string }) {
  return (
    <CenterScreen>
      <LoadingIcon />
      {text ? (
        <Text centered small wrap>
          {text}
        </Text>
      ) : null}
    </CenterScreen>
  )
}
