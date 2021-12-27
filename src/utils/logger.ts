import fs from 'fs'
import dateFormat from 'dateformat'

const MASK = 'dddd, mmmm dS, yyyy, h:MM:ss TT'
const DEBUG_LOG_FILE = 'logs/debug.log'
const ERROR_LOG_FILE = 'logs/error.log'

export default {
  info: (tag: string, msg: string) => {
    const date = dateFormat(new Date(), MASK)
    const line = `[${date}] ${tag.toUpperCase()}: ${msg}\n`
    fs.appendFile(DEBUG_LOG_FILE, line, () => {})
  },
  error(tag: string, msg: string) {
    const date = dateFormat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT')
    const line = `[${date}] ${tag.toUpperCase()}: ${msg}\n`
    fs.appendFile(ERROR_LOG_FILE, line, () => {})
  },
  stacktrace(stack: any) {
    fs.appendFile(ERROR_LOG_FILE, '\n' + stack + '\n\n', () => {})
  },
}
