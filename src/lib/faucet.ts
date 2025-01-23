type Faucets = Record<string, string>

const faucets: Faucets = {
  mutinynet: 'https://faucet.mutinynet.arklabs.to',
  regtest: 'http://localhost:9999',
}

export const hasFaucet = (network: string): boolean => !!faucets[network]

export const callFaucet = async (address: string, amount: number, network: string): Promise<boolean> => {
  const faucetServerUrl = faucets[network]
  if (!faucetServerUrl) return false
  const url = `${faucetServerUrl}/faucet`
  const res = await fetch(url, {
    body: JSON.stringify({ address, amount }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  return res.ok
}
