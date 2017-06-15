
import * as debug from 'debug'
import * as nxLogger from 'nx-logger'

export const transport: nxLogger.nxLogger.TransportFn =
  (configuration, [formatter, ...args]) =>
    configuration.tty ? debug(configuration.namespace.join(':'))(formatter, ...args) : null

