import { consoleError, consoleLog } from './logs'
import { invalidNpub } from './privateKey'
import { Satoshis, Tx, Vtxo } from './types'

export interface AspInfo {
  boardingDescriptorTemplate: string
  code?: number
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

export const collaborativeRedeem = async (amount: number, address: string): Promise<string> => {
  return await window.collaborativeRedeem(address, amount, false)
}

export const getAspInfo = async (url: string): Promise<AspInfo> => {
  return new Promise((resolve) => {
    get('/v1/info', url)
      .then((info: AspInfo) => {
        if (info?.code === 5) {
          console.error('invalid response from server')
          resolve({ ...emptyAspInfo, unreachable: true })
        }
        const {
          boardingDescriptorTemplate,
          dust,
          forfeitAddress,
          network,
          pubkey,
          roundInterval,
          roundLifetime,
          unilateralExitDelay,
        } = info
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
      })
      .catch((err) => {
        consoleError('error getting asp info', err)
        resolve({ ...emptyAspInfo, unreachable: true })
      })
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
      .catch((err) => {
        consoleError('error getting balance', err)
        resolve(0)
      })
  })
}

export const getPrivateKey = async () => {
  return await window.dump()
}

export const getTxHistory = async (): Promise<Tx[]> => {
  const txs: Tx[] = []
  try {
    const res = await window.getTransactionHistory()
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
        pending: !settled,
        settled,
        redeemTxid,
        roundTxid,
        type: type.toLowerCase(),
      })
    }
  } catch (err) {
    consoleError('error getting tx history', err)
    return []
  }
  console.log('tx history', txs)
  return txs
}

export const mockTxHistory = async (): Promise<Tx[]> => {
  const boardingTxs = (await getTxHistory()).filter((tx) => tx.boardingTxid && !tx.settled)
  const { spendable, spent } = await getVtxos()

  const txs: Tx[] = boardingTxs

  const toUnixTime = (str: string) => Math.floor(new Date(str).getTime() / 1000)

  // receivals

  // all vtxos are receivals UNLESS:
  // - they resulted from a settlement
  // - they are change from a payment
  for (const vtxo of [...spendable, ...spent]) {
    const settleVtxos = spent.filter((v) => v.spentBy === vtxo.roundTxid)
    const settleAmount = settleVtxos.reduce((acc, v) => acc + v.amount, 0)
    if (vtxo.amount == settleAmount) continue // settlement, ignore
    if (vtxo.amount < settleAmount) continue // change, ignore

    const spentVtxos = spent.filter((v) => v.spentBy === vtxo.txid)
    const spentAmount = spentVtxos.reduce((acc, v) => acc + v.amount, 0)
    if (vtxo.amount == spentAmount) continue // settlement, ignore
    if (vtxo.amount < spentAmount) continue // change, ignore

    const amount = vtxo.amount - settleAmount

    console.log('one', {
      totalAmount: amount,
      vtxoAmount: vtxo.amount,
      spentAmount,
      settleAmount,
      txid: vtxo.txid,
    })
    txs.push({
      amount,
      boardingTxid: '',
      createdAt: toUnixTime(vtxo.createdAt),
      explorable: '',
      pending: vtxo.pending,
      settled: Boolean(vtxo.spentBy) || !vtxo.pending,
      redeemTxid: vtxo.redeemTx,
      roundTxid: vtxo.roundTxid,
      type: 'received',
    })
  }

  // sendings

  // all spentBy are payments UNLESS:
  // - they are settlements

  // aggregate spent by spentId
  const spentBy: { [key: string]: Vtxo[] } = {}
  for (const vtxo of spent) {
    if (vtxo.spentBy) {
      if (!spentBy[vtxo.spentBy]) spentBy[vtxo.spentBy] = []
      spentBy[vtxo.spentBy].push(vtxo)
    }
  }

  for (const sb of Object.keys(spentBy)) {
    if (spent.find((v) => v.roundTxid === sb)) continue // settlement, ignore

    const changeVtxos = [...spendable, ...spent].filter((v) => v.txid === sb || v.roundTxid === sb)
    const changeAmount = changeVtxos.reduce((acc, v) => acc + v.amount, 0)
    const spentAmount = spentBy[sb].reduce((acc, v) => acc + v.amount, 0)
    if (spentAmount == changeAmount) continue // settlement, ignore
    if (spentAmount < changeAmount) continue // receival, ignore

    const amount = spentAmount - changeAmount
    const vtxo = changeVtxos[0] ?? spentBy[sb][0]
    console.log('changeVtxos', changeVtxos)

    console.log('four', {
      totalAmount: amount,
      vtxoAmount: vtxo.amount,
      spentAmount,
      changeAmount,
      txid: vtxo.txid,
      type: 'sent',
    })

    txs.push({
      amount: amount,
      boardingTxid: '',
      createdAt: toUnixTime(vtxo.createdAt),
      explorable: '',
      pending: vtxo.pending,
      settled: true,
      redeemTxid: vtxo.redeemTx,
      roundTxid: vtxo.roundTxid,
      type: 'sent',
    })
  }

  // sort by date
  txs.sort((a, b) => b.createdAt - a.createdAt)

  console.log('mock tx history', txs)
  return txs
}

export const getReceivingAddresses = async (): Promise<{ offchainAddr: string; boardingAddr: string }> => {
  return await window.receive()
}

export const getVtxos = async (): Promise<{ spendable: Vtxo[]; spent: Vtxo[] }> => {
  const toVtxo = (v: any): Vtxo => {
    return {
      amount: v.Amount,
      createdAt: v.CreatedAt,
      descriptor: v.Descriptor,
      expireAt: v.ExpiresAt,
      pending: v.IsPending,
      roundTxid: v.RoundTxid,
      redeemTx: v.RedeemTx,
      spent: v.Spent,
      spentBy: v.SpentBy,
      txid: v.Txid,
      vout: v.VOut,
    }
  }
  try {
    const json = await window.listVtxos()
    const data = JSON.parse(json)
    const spendable = data.spendable?.map(toVtxo) ?? []
    const spent = data.spent?.map(toVtxo) ?? []
    console.log('vtxos', data)
    return { spendable, spent }
  } catch {
    return { spendable: [], spent: [] }
  }
}

export const lock = async (password: string): Promise<void> => {
  await window.lock(password)
}

export const redeemNotes = async (notes: string[]): Promise<void> => {
  consoleLog('redeeming notes', notes)
  try {
    await window.redeemNotes(notes)
  } catch {
    await window.redeemNotes(notes)
  }
}

export const sendOffChain = async (sats: number, address: string): Promise<string> => {
  consoleLog('sending offchain', sats, address)
  return await window.sendOffChain(false, [{ To: address, Amount: sats }])
}

export const sendOnChain = async (sats: number, address: string): Promise<string> => {
  consoleLog('sending onchain', sats, address)
  return await window.sendOnChain([{ To: address, Amount: sats }])
}

export const settleVtxos = async (): Promise<void> => {
  consoleLog('settling vtxos')
  try {
    await window.settle()
  } catch {}
}

export const setNostrNotificationRecipient = async (npub: string): Promise<void> => {
  if (invalidNpub(npub)) return
  return window.setNostrNotificationRecipient(npub)
}

export const startListenTransactionStream = async (callback: () => {}) => {
  consoleLog('start listening', typeof callback)
  // return await window.getTransactionStream(callback)
}

export const unlock = async (password: string): Promise<void> => {
  return await window.unlock(password)
}

export const walletLocked = async (): Promise<boolean> => {
  return await window.locked()
}
