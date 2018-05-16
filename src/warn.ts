import log from 'fancy-log'

export default function warn(
  message: string,
  forceSuccess: boolean,
  error?: Error,
) {
  let logFn: 'warn'|'error'
  let suffix: 'aborting'|'ignoring'

  if (forceSuccess === true) {
    logFn  = 'error'
    suffix = 'aborting'
  } else {
    logFn  = 'warn'
    suffix = 'ignoring'
  }

  log[logFn](`${message}, ${suffix}...`)

  if (error == null) { return }

  log[logFn]('Detail for debug:\n', error)
}
