import chalk from 'chalk'
import log   from 'fancy-log'

export default function warn(
  message: string,
  forceSuccess: boolean,
  error?: Error,
) {
  let logFn: 'warn'|'error'
  let prefix: string
  let suffix: 'aborting'|'ignoring'

  if (forceSuccess === true) {
    logFn  = 'error'
    prefix = chalk.red('[FAIL] ')
    suffix = 'aborting'
  } else {
    logFn  = 'warn'
    prefix = chalk.yellow('[WARN] ')
    suffix = 'ignoring'
  }

  log[logFn](`${prefix}${message}, ${suffix}...`)

  if (error == null) { return }

  log[logFn]('Detail for debug:\n          ', error.message || error)
}
