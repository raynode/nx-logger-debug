
import { TransportFn } from '@raynode/nx-logger'
import * as debug from 'debug'

export const transport: TransportFn =
  (configuration, [formatter, ...args]) =>
    configuration.tty ? debug(configuration.namespace.join(':'))(formatter, ...args) : null
