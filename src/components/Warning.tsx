import ForbidIcon from '../icons/Forbid'
import InfoIcon from '../icons/Info'
import FlexRow from './FlexRow'
import Text from './Text'

interface WarningProps {
  green?: boolean
  red?: boolean
  text: string
}

export default function WarningBox({ green, red, text }: WarningProps) {
  const backgroundColor = red ? '#380008' : green ? '#092d13' : '#2E1800'
  const borderColor = red ? '#FF4F4F' : green ? '#2dd55c' : '#FC8C0B'
  const Icon = () => (red ? <ForbidIcon /> : <InfoIcon />)

  const style = {
    backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '0.5rem',
    color: 'var(--white)',
    padding: '1rem',
    width: '100%',
  }

  return (
    <div style={style}>
      <FlexRow gap='1rem'>
        <div style={{ color: borderColor }}>
          <Icon />
        </div>
        <Text small wrap>
          {text}
        </Text>
      </FlexRow>
    </div>
  )
}
