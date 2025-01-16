import Shadow from './Shadow'
import FlexRow from './FlexRow'
import InfoIcon from '../icons/Info'
import Padded from './Padded'
import FlexCol from './FlexCol'
import Text from './Text'

interface InfoProps {
  color: string
  title: string
  text: string
}

export default function Info({ color, title, text }: InfoProps) {
  return (
    <Shadow>
      <Padded>
        <FlexCol>
          <Text bold color={color}>
            {title}
          </Text>
          <hr style={{ backgroundColor: 'var(--dark10)', width: '100%' }} />
          <FlexRow alignItems='flex-start'>
            <InfoIcon color='dark50' />
            <Text color='dark50' small wrap>
              {text}
            </Text>
          </FlexRow>
        </FlexCol>
      </Padded>
    </Shadow>
  )
}
