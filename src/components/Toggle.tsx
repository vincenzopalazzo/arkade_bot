import { TextNormal } from './Text'
import { IonToggle } from '@ionic/react'
import FlexRow from './FlexRow'
import Padded from './Padded'
import Shadow from './Shadow'

interface ToggleProps {
  checked: boolean
  onClick: () => void
  text: string
}

export default function Toggle({ checked, onClick, text }: ToggleProps) {
  return (
    <Shadow squared>
      <Padded>
        <FlexRow between>
          <TextNormal>{text}</TextNormal>
          <IonToggle checked={checked} onClick={onClick} />
        </FlexRow>
      </Padded>
    </Shadow>
  )
}
