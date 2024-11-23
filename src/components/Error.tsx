import Shadow from './Shadow'
import Text from './Text'

interface ErrorProps {
  error: boolean
  text: string
}

export default function Error({ error, text }: ErrorProps) {
  if (!error) return null
  return (
    <Shadow red>
      <Text bold centered color='white' small>
        {text}
      </Text>
    </Shadow>
  )
}
