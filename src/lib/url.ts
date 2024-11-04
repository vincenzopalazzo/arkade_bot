export const arkNoteInUrl = (): string => {
  const fragment = window.location.hash.slice(1)
  return /^arknote/.test(fragment) ? fragment : ''
}
