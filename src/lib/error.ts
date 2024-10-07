export const extractError = (error: any): string => {
  if (error.message) return error.message
  if (error?.response?.data?.error) return error.response.data.error
  if (typeof error === 'string') return error
  return JSON.stringify(error)
}
