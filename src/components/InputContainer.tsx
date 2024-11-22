import { ReactNode } from 'react'
import Text from './Text'
import Error from './Error'
import FlexRow from './FlexRow'
import Shadow from './Shadow'
import FlexCol from './flexCol'

interface InputContainerProps {
  children: ReactNode
  error?: string
  label?: string
  right?: string
}

export default function InputContainer({ children, error, label, right }: InputContainerProps) {
  const TopLabel = () => (
    <FlexRow between>
      <Text size='smaller'>{label}</Text>
      <Text size='smaller' color='white50'>
        {right}
      </Text>
    </FlexRow>
  )

  return (
    <FlexCol>
      <FlexCol gap='0.25rem'>
        {label || right ? <TopLabel /> : null}
        <Shadow>{children}</Shadow>
      </FlexCol>
      <Error error={Boolean(error)} text={error ?? ''} />
    </FlexCol>
  )
}
