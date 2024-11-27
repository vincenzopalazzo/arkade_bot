import BarcodeScanner from './BarcodeScanner'
import Button from './Button'
import ButtonsOnBottom from './ButtonsOnBottom'
import Content from './Content'
import Header from './Header'
import Padded from './Padded'

interface ScannerProps {
  close: () => void
  label: string
  setData: (arg0: string) => void
  setError: (arg0: string) => void
}

export default function Scanner({ close, label, setData, setError }: ScannerProps) {
  return (
    <>
      <Header text={label} back={close} />
      <Content>
        <Padded>
          <BarcodeScanner setData={setData} setError={setError} />
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button onClick={close} label='Cancel' />
      </ButtonsOnBottom>
    </>
  )
}
