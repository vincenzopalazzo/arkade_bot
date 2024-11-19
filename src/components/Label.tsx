import ArrowIcon from '../icons/Arrow'

interface LabelProps {
  onClick?: () => void
  text: string
}

export default function Label({ onClick, text }: LabelProps) {
  const className = 'block text-sm text-left font-medium'
  if (onClick)
    return (
      <div className='flex items-center cursor-pointer gap-1 mb-1' onClick={onClick}>
        <label className={className}>{text}</label>
        <ArrowIcon tiny />
      </div>
    )
  return <label className={className}>{text}</label>
}
