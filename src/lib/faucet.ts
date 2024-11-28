export const faucet = async (address: string, sats: number): Promise<boolean> => {
  const url = 'https://faucet.mutinynet.com/api/onchain'
  const response = await fetch(url, {
    body: JSON.stringify({ address, sats }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  return response.ok
}

export const sleep = async (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
