import { useContext } from 'react'
import BackIcon from '../../icons/Back'
import SettingsBlackIcon from '../../icons/SettingsBlack'
import { ConfigContext } from '../../providers/config'

export default function Header({ hideBack, setOption }: any) {
  const { toggleShowConfig } = useContext(ConfigContext)

  return (
    <header className='flex justify-between w-full mb-4 sm:mb-10'>
      {hideBack ? (
        <p />
      ) : (
        <button
          onClick={() => setOption('menu')}
          aria-label='Back'
          className='p-2 rounded-full bg-gray-100 dark:bg-gray-800'
        >
          <BackIcon />
        </button>
      )}
      <button onClick={toggleShowConfig} className='p-2 rounded-full bg-gray-800 dark:bg-gray-100'>
        <SettingsBlackIcon />
      </button>
    </header>
  )
}
