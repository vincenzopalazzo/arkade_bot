import { extractError } from './error'

export function canBrowserShareData(data: any): boolean {
  if (!navigator.share || !navigator.canShare) return false
  return navigator.canShare(data)
}

export async function shareData(data: any) {
  try {
    await navigator.share(data)
  } catch (err) {
    throw `Error sharing data: ${extractError(err)}`
  }
}
