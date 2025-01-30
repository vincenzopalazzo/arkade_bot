import Shadow from './Shadow'
import FlexRow from './FlexRow'
import { InfoIconDark } from '../icons/Info'
import Padded from './Padded'
import FlexCol from './FlexCol'
import Text from './Text'
import { ReactNode } from 'react'

interface InfoProps {
  children: ReactNode
  color: string
  title: string
}

export default function Info({ children, color, title }: InfoProps) {
  return (
    <Shadow lighter>
      <Padded>
        <FlexCol>
          <Text bold color={color}>
            {title}
          </Text>
          <hr style={{ backgroundColor: 'var(--dark10)', width: '100%' }} />
          <FlexRow alignItems='flex-start'>
            <div style={{ minWidth: '20px' }}>
              <InfoIconDark />
            </div>
            <FlexCol gap='0.5rem'>{children}</FlexCol>
          </FlexRow>
        </FlexCol>
      </Padded>
    </Shadow>
  )
}
