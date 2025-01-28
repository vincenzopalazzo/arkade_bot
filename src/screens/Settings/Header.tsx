import MainHeader from '../../components/Header'
import { useContext } from 'react'
import { OptionsContext } from '../../providers/options'

interface HeaderProps {
  auxFunc?: () => void
  auxText?: string
  back?: boolean
  text: string
}

export default function Header({ auxFunc, auxText, back, text }: HeaderProps) {
  const { goBack } = useContext(OptionsContext)

  return <MainHeader auxFunc={auxFunc} auxText={auxText} back={back ? goBack : undefined} text={text} />
}
