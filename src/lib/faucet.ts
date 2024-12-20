export const getNote = async (amount: number, aspUrl: string): Promise<string> => {
  const url = `${aspUrl}/v1/admin/note`
  const res = await fetch(url, {
    body: JSON.stringify({ amount, quantity: 1 }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  if (!res.ok) throw 'Unable to contact faucet'
  const json = await res.json()
  if (!json.notes?.[0]) throw 'Faucet is dry'
  return json.notes[0]
}
