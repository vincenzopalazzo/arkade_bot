import { Satoshis, Tx, Vtxo } from './types'

export interface AspInfo {
  boardingDescriptorTemplate: string
  dust: number
  forfeitAddress: string
  network: string
  pubkey: string
  roundInterval: number
  roundLifetime: number
  unilateralExitDelay: number
  unreachable: boolean
  url: string
}

export const emptyAspInfo: AspInfo = {
  boardingDescriptorTemplate: '',
  dust: 0,
  forfeitAddress: '',
  network: '',
  pubkey: '',
  roundInterval: 0,
  roundLifetime: 0,
  unilateralExitDelay: 0,
  unreachable: false,
  url: '',
}

const headers = { 'Content-Type': 'application/json' }

const get = async (endpoint: string, url: string) => {
  const response = await fetch(url + endpoint, { headers })
  return await response.json()
}

export const settleVtxos = async () => {
  await window.settle()
}

export const collaborativeRedeem = async (amount: number, address: string): Promise<string> => {
  return await window.collaborativeRedeem(address, amount, false)
}

export const getAspInfo = async (url: string): Promise<AspInfo> => {
  return new Promise((resolve) => {
    get('/v1/info', url)
      .then(
        ({
          boardingDescriptorTemplate,
          dust,
          forfeitAddress,
          network,
          pubkey,
          roundInterval,
          roundLifetime,
          unilateralExitDelay,
        }) => {
          resolve({
            boardingDescriptorTemplate,
            dust,
            forfeitAddress,
            network,
            pubkey,
            roundInterval,
            roundLifetime: Number(roundLifetime),
            unilateralExitDelay: Number(unilateralExitDelay),
            unreachable: false,
            url,
          })
        },
      )
      .catch(() => resolve({ ...emptyAspInfo, unreachable: true }))
  })
}

export const getBalance = async (): Promise<Satoshis> => {
  return new Promise((resolve) => {
    window
      .balance(false)
      .then((balance) => {
        if (!balance) resolve(0)
        const { offchainBalance, onchainBalance } = balance
        resolve(offchainBalance + onchainBalance.spendable + onchainBalance.locked)
      })
      .catch(() => resolve(0))
  })
}

export const getPrivateKey = async () => {
  return await window.dump()
}

export const getTxHistory = async (): Promise<Tx[]> => {
  const txs: Tx[] = []
  try {
    const res = await window.getTransactionHistory()
    console.log('res', res)
    if (!res) return []
    for (const tx of JSON.parse(res)) {
      const date = new Date(tx.createdAt)
      const unix = Math.floor(date.getTime() / 1000)
      const { boardingTxid, settled, redeemTxid, roundTxid, type } = tx
      const explorable = boardingTxid
        ? boardingTxid
        : roundTxid
        ? roundTxid === redeemTxid // TODO: remove after bug is fixed
          ? undefined
          : roundTxid
        : undefined
      txs.push({
        amount: Math.abs(parseInt(tx.amount, 10)),
        boardingTxid,
        createdAt: unix,
        explorable,
        pending: !settled && boardingTxid,
        settled,
        redeemTxid,
        roundTxid,
        type: type.toLowerCase(),
      })
    }
  } catch (_) {
    return []
  }
  return txs.sort((a: Tx, b: Tx) => a.createdAt - b.createdAt)
}

export const getReceivingAddresses = async (): Promise<{ offchainAddr: string; boardingAddr: string }> => {
  return await window.receive()
}

export const getVtxos = async (): Promise<{ spendable: Vtxo[]; spent: Vtxo[] }> => {
  const toVtxo = (v: any): Vtxo => {
    return {
      amount: v.Amount,
      descriptor: v.Descriptor,
      expireAt: v.ExpiresAt,
      pending: v.Pending,
      roundTxid: v.RoundTxid,
      redeemTx: v.RedeemTx,
      spent: v.Spent,
      spentBy: v.SpentBy,
      txid: v.Txid,
      vout: v.VOut,
    }
  }
  const json = await window.listVtxos()
  const data = JSON.parse(json)
  const spendable = data.spendable?.map(toVtxo)
  const spent = data.spent?.map(toVtxo)
  return { spendable, spent }
}

export const lock = async (password: string): Promise<void> => {
  await window.lock(password)
}

export const redeemNotes = async (notes: string[]): Promise<void> => {
  console.log('redeeming notes', notes)
  return await window.redeemNotes(notes)
}

export const sendAsync = async (sats: number, address: string): Promise<string> => {
  console.log('sending async', sats, address)
  return await window.sendAsync(false, [{ To: address, Amount: sats }])
}

export const sendOffChain = async (sats: number, address: string): Promise<string> => {
  console.log('Sending offchain', sats, address)
  return await window.sendOffChain(false, [{ To: address, Amount: sats }])
}

export const sendOnChain = async (sats: number, address: string): Promise<string> => {
  console.log('sending onchain', sats, address)
  return await window.sendOnChain([{ To: address, Amount: sats }])
}

export const startListenTransactionStream = async (callback: () => {}) => {
  console.log('start listening', typeof callback)
  // return await window.getTransactionStream(callback)
}

export const unlock = async (password: string): Promise<void> => {
  await window.unlock(password)
}

export const walletLocked = async (): Promise<void> => {
  await window.locked()
}
