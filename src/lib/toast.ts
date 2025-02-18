export const presentToast = (present: any, message = 'Copied to clipboard') => {
  present({
    message,
    duration: 1000,
    position: 'top',
  })
}
