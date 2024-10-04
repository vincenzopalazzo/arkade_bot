import { bech32m } from 'bech32'

export function convertbits(data: number[], frombits: number, tobits: number, pad: boolean) {
  var acc = 0
  var bits = 0
  var ret = []
  var maxv = (1 << tobits) - 1
  for (var p = 0; p < data.length; ++p) {
    var value = data[p]
    if (value < 0 || value >> frombits !== 0) {
      return null
    }
    acc = (acc << frombits) | value
    bits += frombits
    while (bits >= tobits) {
      bits -= tobits
      ret.push((acc >> bits) & maxv)
    }
  }
  if (pad) {
    if (bits > 0) {
      ret.push((acc << (tobits - bits)) & maxv)
    }
  } else if (bits >= frombits || (acc << (tobits - bits)) & maxv) {
    return null
  }
  return ret
}

export const decodeArkAddress = (addr: string) => {
  const { words } = bech32m.decode(addr, 300)
  const buf = convertbits(words, 5, 8, false)
  if (!buf) throw 'Error'
  return {
    aspKey: Buffer.from(buf.slice(0, 33)).toString('hex'),
    usrKey: Buffer.from(buf.slice(33, 66)).toString('hex'),
  }
}
