import { TextNormal } from './Text'
import { IonToggle } from '@ionic/react'
import FlexRow from './FlexRow'
import Padded from './Padded'
import Shadow from './Shadow'

interface CheckboxProps {
  checked: boolean
  onClick: () => void
  text: string
}

export default function Checkbox({ checked, onClick, text }: CheckboxProps) {
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
