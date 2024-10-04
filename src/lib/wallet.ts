import BIP32Factory from 'bip32'
import { mnemonicToSeed } from 'bip39'
import * as ecc from '@bitcoinerlab/secp256k1'

const bip32 = BIP32Factory(ecc)

export const getPrivateKeyFromMnemonic = async (mnemonic: string): Promise<string> => {
  const seed = await mnemonicToSeed(mnemonic)
  if (!seed) throw new Error('Could not get seed from mnemonic')
  const masterNode = bip32.fromSeed(seed)
  const key = masterNode.derivePath("44/1237/0'").derive(0).derive(0)
  return key.privateKey!.toString('hex')
}
