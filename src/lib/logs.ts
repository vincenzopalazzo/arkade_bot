import { extractError } from './error'

enum LogLevel {
  Log = 'log',
  Error = 'error',
}

export type LogLine = {
  msg: string
  time: string
  level: string
}

const itemName = 'logs'

export const getLogs = (): LogLine[] => {
  const logs = localStorage.getItem(itemName)
  return JSON.parse(logs ?? '[]') as LogLine[]
}

export const clearLogs = () => localStorage.removeItem(itemName)

const addLog = (level: LogLevel, args: string[]) => {
  const logs = getLogs()
  logs.push({
    level,
    msg: args.join(' '),
    time: new Date().toString(),
  })
  localStorage.setItem(itemName, JSON.stringify(logs))
}

export const consoleLog = (...args: any[]) => {
  addLog(LogLevel.Log, args)
  console.log(...args)
}

export const consoleError = (err: any, msg = '') => {
  const str = `${msg}: ${extractError(err)}`
  addLog(LogLevel.Error, [str])
  console.error(str)
}
