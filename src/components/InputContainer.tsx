import { ReactNode } from 'react'
import Text from './Text'
import Error from './Error'
import FlexRow from './FlexRow'
import Shadow from './Shadow'
import FlexCol from './FlexCol'
import Padded from './Padded'

interface InputContainerProps {
  children: ReactNode
  error?: string
  label?: string
  right?: JSX.Element
}

export default function InputContainer({ children, error, label, right }: InputContainerProps) {
  const TopLabel = () => (
    <FlexRow between>
      <Text smaller>{label}</Text>
      <div>{right}</div>
    </FlexRow>
  )

  return (
    <FlexCol>
      <FlexCol gap='0.5rem'>
        {label || right ? <TopLabel /> : null}
        <Shadow>
          <Padded>{children}</Padded>
        </Shadow>
      </FlexCol>
      <Error error={Boolean(error)} text={error ?? ''} />
    </FlexCol>
  )
}
