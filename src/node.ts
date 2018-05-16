import { defer } from '@whitetrefoil/deferred'
import chalk             from 'chalk'
import check     from 'check-node-version'
import log       from 'fancy-log'
import readPkg   from 'read-pkg-up'
import warn      from './warn'

export interface ICheckNodeOptions {
  forceSuccess: boolean,
}

export default async function checkNode(options?: ICheckNodeOptions): Promise<boolean> {
  const forceSuccess = options != null && options.forceSuccess === true

  log('Checking engines\' requirements...')

  let pkg: { [k: string]: any }
  try {
    pkg = (await readPkg({ normalize: false })).pkg
  } catch (e) {
    warn('No "package.json" file found or failed to load it', forceSuccess, e)
    return !forceSuccess
  }

  if (pkg.engines == null) {
    warn('No "engines" field found in "package.json"', forceSuccess, pkg as Error)
    return !forceSuccess
  }

  const deferred = defer<boolean>()

  check(pkg.engines, ((error, results) => {
    if (error != null) {
      warn('Failed to check version of engines', forceSuccess, error)
      deferred.resolve(!forceSuccess)
      return
    }

    if (results.isSatisfied === true) {
      log(chalk`{green [PASS]} All engines meet the requirement!`)
      deferred.resolve(true)
      return
    }

    log.error(chalk`{red [FAIL]} Some of your engines do not meet the requirement!`)
    for (const name in results.versions) {
      if (!results.versions.hasOwnProperty(name)) { continue }
      const engine = results.versions[name]
      if (engine.isSatisfied === true) { continue }

      const wanted = engine.wanted != null ? engine.wanted.raw : 'any'
      const actual = engine.notfound ? 'not installed' : engine.version as string
      log.error(`Requires ${name}: ${chalk.green(wanted)}, actually ${chalk.red(actual)}`)
    }

    deferred.resolve(false)
    return
  }))

  return deferred.promise
}
