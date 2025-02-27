import { getFaucetUrl } from './constants'

export const callFaucet = async (address: string, amount: number, arkServerUrl: string): Promise<boolean> => {
  const faucetServerUrl = getFaucetUrl(arkServerUrl)
  if (!faucetServerUrl) return false
  const url = `${faucetServerUrl}/faucet`
  const res = await fetch(url, {
    body: JSON.stringify({ address, amount }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  return res.ok
}

export const pingFaucet = async (arkServerUrl: string): Promise<boolean> => {
  try {
    const faucetServerUrl = getFaucetUrl(arkServerUrl)
    if (!faucetServerUrl) return false
    const opt = { headers: { 'Content-Type': 'application/json' } }
    const url = `${faucetServerUrl}/healthcheck`
    const res = await fetch(url, opt)
    return res.ok
  } catch {
    return false
  }
}
