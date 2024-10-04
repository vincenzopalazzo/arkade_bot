export default function Pill({ text }: { text: string }) {
  return (
    <div className='flex items-center'>
      <p className='bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 px-1 rounded-md uppercase text-xxs font-semibold'>
        {text}
      </p>
    </div>
  )
}
