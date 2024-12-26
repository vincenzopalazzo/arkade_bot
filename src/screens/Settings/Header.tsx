import MainHeader from '../../components/Header'
import { useContext } from 'react'
import { OptionsContext } from '../../providers/options'

interface HeaderProps {
  all?: () => void
  back?: boolean
  clear?: () => void
  text: string
}

export default function Header({ all, back, clear, text }: HeaderProps) {
  const { goBack } = useContext(OptionsContext)

  return <MainHeader all={all} back={back ? goBack : undefined} clear={clear} text={text} />
}
