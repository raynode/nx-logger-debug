
import * as debug from 'debug'
import { nxLogger } from '@raynode/nx-logger'

export const transport: nxLogger.TransportFn =
  (configuration, [formatter, ...args]) =>
    configuration.tty ? debug(configuration.namespace.join(':'))(formatter, ...args) : null

