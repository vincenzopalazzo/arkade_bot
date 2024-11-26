export const extractError = (error: any): string => {
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message
  if (error?.response?.data?.error) return error.response.data.error
  if (error.message) return error.message
  return JSON.stringify(error)
}
