import Shadow from './Shadow'
import FlexRow from './FlexRow'
import { InfoIconDark } from '../icons/Info'
import Padded from './Padded'
import FlexCol from './FlexCol'
import Text, { TextSecondary } from './Text'

interface InfoProps {
  color: string
  title: string
  text: string
}

export default function Info({ color, title, text }: InfoProps) {
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
            <TextSecondary small wrap>
              {text}
            </TextSecondary>
          </FlexRow>
        </FlexCol>
      </Padded>
    </Shadow>
  )
}
