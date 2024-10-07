export const extractError = (error: any): string => {
  if (error?.response?.data?.error) return error.response.data.error
  if (typeof error === 'string') return error
  if (error.message) return error.message
  return JSON.stringify(error)
}
