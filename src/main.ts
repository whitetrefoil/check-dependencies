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

  log('=============================================')
  log('=       Node / NPM Dependencies Check       =')
  log('=============================================')

  try {
    const isNpmOk = await npm({
      forceSuccess,
      config: options != null ? options.checkDependenciesConfig : undefined,
    })

    const isNodeOk = await node({ forceSuccess })

    return isNpmOk && isNodeOk
  } catch (e) {
    log.error('Something unexpected is happening! Exiting!\n', e)
    return false
  }
}
