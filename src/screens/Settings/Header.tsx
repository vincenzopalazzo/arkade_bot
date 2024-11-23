import MainHeader from '../../components/Header'
import { useContext } from 'react'
import { OptionsContext } from '../../providers/options'

interface HeaderProps {
  all?: () => void
  back?: boolean
  text: string
}

export default function Header({ all, back, text }: HeaderProps) {
  const { goBack } = useContext(OptionsContext)

  return <MainHeader all={all} back={back ? goBack : undefined} text={text} />
}
