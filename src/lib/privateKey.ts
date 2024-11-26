import { getPublicKey, nip19 } from 'nostr-tools'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'

export const invalidPrivateKey = (key: string): string => {
  if (key.length === 0) return ''
  if (key.length !== 64) return 'Invalid length, must be 64'
  if (!/^[0-9A-Fa-f]+$/.test(key)) return 'Invalid format, must be hexadecimal'
  return ''
}

export const invalidNpub = (npub: string): string => {
  if (!npub) return 'You must define a npub'
  if (!/^npub/.test(npub)) return 'Invalid prefix'
  if (npub.length !== 63) return 'Invalid length, must be 63'
  try {
    nip19.decode(npub)
  } catch {
    return 'Invalid npub'
  }
  return ''
}

export const nsecToSeed = (nsec: string): string => {
  const { type, data } = nip19.decode(nsec)
  if (type !== 'nsec') throw 'invalid nsec'
  console.log('nsec', nsec)
  console.log('seed', bytesToHex(data))
  return bytesToHex(data)
}

export const seedToNsec = (seed: string | Uint8Array): string => {
  const sk = typeof seed === 'string' ? hexToBytes(seed) : seed
  return nip19.nsecEncode(sk)
}

export const seedToNpub = (seed: string | Uint8Array): string => {
  const sk = typeof seed === 'string' ? hexToBytes(seed) : seed
  return nip19.npubEncode(getPublicKey(sk))
}
