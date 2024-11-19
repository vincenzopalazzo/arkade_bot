import { useContext } from 'react'
import ArrowIcon from '../../icons/Arrow'
import Header from '../../components/Header'
import { OptionsContext } from '../../providers/options'

export default function Menu() {
  const { setOption, validOptions } = useContext(OptionsContext)

  return (
    <>
      <Header text='Settings' />
      <div className='flex flex-col h-full justify-between'>
        <div>
          {validOptions().map(({ icon, option }) => (
            <div
              className='flex justify-between cursor-pointer px-2.5 py-2.5 first:border-t-2 border-b-2 dark:border-gray-700'
              key={option}
              onClick={() => setOption(option)}
            >
              <div className='flex items-center'>
                {icon}
                <p className='ml-4 text-xl capitalize'>{option}</p>
              </div>
              <div className='flex items-center'>
                <ArrowIcon />
              </div>
            </div>
          ))}
        </div>
        <p className='font-semibold text-xs text-center'>v2024110401</p>
      </div>
    </>
  )
}
