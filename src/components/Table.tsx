export default function Table({ data }: { data: string[][] }) {
  if (data.length < 3) return <p>This transaction pays no fees</p>
  return (
    <table className='w-full table-fixed mt-0.5'>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row[0]} className={idx + 1 === data.length ? 'border-t' : ''}>
            <td className='py-3 text-left font-semibold'>{row[0]}</td>
            {row[1] === 'Pending' ? (
              <td className='py-3 text-right text-red-600'>{row[1]}</td>
            ) : row[1] === 'Settled' ? (
              <td className='py-3 text-right text-green-600'>{row[1]}</td>
            ) : (
              <td className='py-3 text-right'>{row[1]}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
