export default function Table({ data }: { data: string[][] }) {
  if (data.length < 3) return <p>This transaction pays no fees</p>
  return (
    <>
      <div className='w-full'>
        {data.map((row) => (
          <div key={row[0]} className={`flex justify-between py-2 ${row[0] === 'Total' ? 'border-t' : null}`}>
            <p className='font-semibold'>{row[0]}</p>
            {row[1] === 'Pending' ? (
              <p className='text-red-600'>{row[1]}</p>
            ) : row[1] === 'Settled' ? (
              <p className='text-green-600'>{row[1]}</p>
            ) : (
              <p>{row[1]}</p>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
