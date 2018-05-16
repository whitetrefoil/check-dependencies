import chalk             from 'chalk'
import check, { Config } from 'check-dependencies'
import log               from 'fancy-log'
import warn              from './warn'

export interface ICheckNpmOptions {
  forceSuccess?: boolean,
  config?: Config,
}

const DEFAULT_OPTION: Config = {
  checkCustomPackageNames: true,
  checkGitUrls           : true,
  install                : false,
}

export default async function checkNpm(options?: ICheckNpmOptions): Promise<boolean> {
  const forceSuccess = options != null && options.forceSuccess === true

  log('Checking NPM packages\' requirements...')

  try {
    const optionsToCD = options != null && options.config != null
      ? { ...DEFAULT_OPTION, ...options.config }
      : DEFAULT_OPTION

    const result = await check(optionsToCD)

    if (result.depsWereOk) {
      log(chalk`{green [PASS]} Every NPM packages are checked and OK.`)
      return true
    }

    log.error(chalk`{red [FAIL]} There are something wrong within your local NPM packages:`)

    for (const line of result.error) {
      log.error(line)
    }

    return false
  } catch (e) {
    warn('Failed to check NPM dependencies', forceSuccess, e)
    return !forceSuccess
  }
}
