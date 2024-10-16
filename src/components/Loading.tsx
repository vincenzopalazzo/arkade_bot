import LoadingIcon from '../icons/Loading'

export default function Loading({ text }: { text?: string }) {
  return (
    <div className='flex h-40 mt-10'>
      <div className='flex flex-col gap-10 items-center m-auto w-72'>
        <LoadingIcon />
        {text ? <p>{text}</p> : null}
      </div>
    </div>
  )
}
