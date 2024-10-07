import { bech32 } from 'bech32'

export const invalidPrivateKey = (key: string): string => {
  if (key.length === 0) return ''
  if (key.length !== 64) return 'Invalid length, must be 64'
  if (!/^[0-9A-Fa-f]+$/.test(key)) return 'Invalid format, must be hexadecimal'
  return ''
}

export const nsecToPrivateKey = (nsec: string): string => {
  const x = bech32.decode(nsec)
  const z = bech32.fromWords(x.words)
  return Array.from(z, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export const privateKeyToNsec = (sk: string): string => {
  let words = bech32.toWords(Buffer.from(sk, 'hex'))
  return bech32.encode('nsec', words)
}
