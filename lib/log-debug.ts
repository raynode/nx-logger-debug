
import * as debug from 'debug'
import { nxLogger } from 'nx-logger'

export const transport: nxLogger.TransportFn =
  (configuration, messages) =>
    configuration.tty ? debug(configuration.namespace.join(':'))(...messages) : null
