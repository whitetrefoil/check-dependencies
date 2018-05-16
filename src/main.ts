import chalk      from 'chalk'
import { Config } from 'check-dependencies'
import log        from 'fancy-log'
import node       from './node'
import npm        from './npm'

export interface IOptions {
  checkDependenciesConfig: Config
}

export default async function checkDependencies(
  forceSuccess: boolean = false,
  options?: IOptions,
): Promise<boolean> {

  log('')
  log(chalk`{green =============================================}`)
  log(chalk`{green =}       Node / NPM Dependencies Check       {green =}`)
  log(chalk`{green =============================================}`)
  log('')

  try {
    const isNpmOk = await npm({
      forceSuccess,
      config: options != null ? options.checkDependenciesConfig : undefined,
    })

    const isNodeOk = await node({ forceSuccess })

    const result = isNpmOk && isNodeOk

    log('')
    if (result) {
      log(chalk`{green =============================================}`)
      log(chalk`{green =}    Node / NPM Dependencies Check: {inverse {green PASS}}    {green =}`)
      log(chalk`{green =============================================}`)
    } else {
      log(chalk`{red =============================================}`)
      log(chalk`{red =}    Node / NPM Dependencies Check: {inverse {red FAIL}}    {red =}`)
      log(chalk`{red =============================================}`)
    }
    log('')

    return result
  } catch (e) {
    log.error('Something unexpected is happening! Exiting!\n', e)
    return false
  }
}
