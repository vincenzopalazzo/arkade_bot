interface ErrorProps {
  error: boolean
  text: string
}

export default function Error({ error, text }: ErrorProps) {
  if (!error) return null
  return (
    <p className='bg-red-500 font-semibold md:p-4 p-1 rounded-md text-center text-sm text-white first-letter:uppercase'>
      {text}
    </p>
  )
}
