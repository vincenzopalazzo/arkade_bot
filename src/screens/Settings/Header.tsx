import MainHeader from '../../components/Header'
import { useContext } from 'react'
import { OptionsContext } from '../../providers/options'

interface HeaderProps {
  back?: boolean
  text: string
}

export default function Header({ back, text }: HeaderProps) {
  const { goBack } = useContext(OptionsContext)

  return <MainHeader text={text} back={back ? goBack : undefined} />
}
