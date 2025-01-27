import { consoleError } from './logs'

export const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard) {
    try {
      return await navigator.clipboard.writeText(text)
    } catch (err) {
      consoleError(err, 'error writing to clipboard')
    }
  }
}

export const pasteFromClipboard = async (): Promise<string> => {
  if (navigator.clipboard) {
    try {
      return await navigator.clipboard.readText()
    } catch (err) {
      consoleError(err, 'error pasting from clipboard')
    }
  }
  return ''
}

export const queryPastePermission = async (): Promise<PermissionState> => {
  try {
    return (await navigator.permissions.query({ name: 'clipboard-read' as PermissionName })).state
  } catch (err) {
    consoleError(err, 'error querying clipboard-read permission')
    return 'denied'
  }
}
