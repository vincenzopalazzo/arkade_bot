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
    } catch {}
  }
  return ''
}
