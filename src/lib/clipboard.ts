export const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard) {
    try {
      return await navigator.clipboard.writeText(text)
    } catch {}
  }
}

export const pasteFromClipboard = async (): Promise<string> => {
  if (navigator.clipboard) {
    try {
      return await navigator.clipboard.readText()
    } catch (err) {
      console.error('error pasting from clipboard', err)
    }
  }
  return ''
}

export const queryPastePermission = async (): Promise<PermissionState> => {
  return (await navigator.permissions.query({ name: 'clipboard-read' as PermissionName })).state
}
