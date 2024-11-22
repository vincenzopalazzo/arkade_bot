import { ReactNode } from 'react'
import Text from './Text'
import Error from './Error'
import FlexRow from './FlexRow'
import Shadow from './Shadow'
import FlexCol from './flexCol'
import Padded from './Padded'

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
      <Text size='smaller' color='dark50'>
        {right}
      </Text>
    </FlexRow>
  )

  return (
    <FlexCol>
      <FlexCol gap='0.25rem'>
        {label || right ? <TopLabel /> : null}
        <Shadow>
          <Padded>{children}</Padded>
        </Shadow>
      </FlexCol>
      <Error error={Boolean(error)} text={error ?? ''} />
    </FlexCol>
  )
}
