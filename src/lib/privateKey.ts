export const invalidPrivateKey = (key: string): string => {
  if (key.length === 0) return ''
  if (key.length !== 64) return 'Invalid length, must be 64'
  if (!/^[0-9A-Fa-f]+$/.test(key)) return 'Invalid format, must be hexadecimal'
  return ''
}
