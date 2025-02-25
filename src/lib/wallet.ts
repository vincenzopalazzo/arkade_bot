import BIP32Factory from 'bip32'
import { mnemonicToSeed } from 'bip39'
import * as ecc from '@bitcoinerlab/secp256k1'
import { Vtxo, Vtxos } from './types'

const bip32 = BIP32Factory(ecc)

export const getPrivateKeyFromMnemonic = async (mnemonic: string): Promise<string> => {
  const seed = await mnemonicToSeed(mnemonic)
  if (!seed) throw new Error('Could not get seed from mnemonic')
  const masterNode = bip32.fromSeed(seed)
  const key = masterNode.derivePath("44/1237/0'").derive(0).derive(0)
  return key.privateKey!.toString('hex')
}

export const calcNextRollover = (vtxos: Vtxos): number =>
  vtxos.spendable
    ? vtxos.spendable.reduce((acc: number, cur: Vtxo) => {
        const unixtimestamp = Math.floor(new Date(cur.expireAt).getTime() / 1000)
        return unixtimestamp < acc || acc === 0 ? unixtimestamp : acc
      }, 0)
    : 0

export const vtxosExpiringSoon = (nextRollOver: number): boolean => {
  if (!nextRollOver) return false
  const now = Math.floor(new Date().getTime() / 1000)
  const threshold = 60 * 60 * 24 // one day in seconds
  return now + threshold > nextRollOver
}
