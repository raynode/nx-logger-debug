
// tslint:disable-next-line
import * as faker from 'faker'
// tslint:disable-next-line
import {
  Config,
  configure,
  create,
} from '@raynode/nx-logger'

import * as debug from './__mocks__/debug'
import { transport } from './log-debug'

const { setMockHandler } = debug

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50

describe('nx-logger-debug', () => {
  const sendMessageWithSettings = (
    loggerOptions: Partial<Config>,
    message = faker.random.word(),
    namespace = [faker.random.word(), faker.random.word()],
  ) => {
    configure({ ...loggerOptions, transport })
    const inNs = [faker.random.word(), faker.random.word()]
    const inMsg = faker.random.word()
    const log = create(...namespace)
    let called = false
    setMockHandler(ns => {
      return (formatter: any, ...args: any[]) => {
        expect(ns).toEqual(namespace.join(':'))
        expect(formatter).toEqual(message)
        called = true
      }
    })
    log(message)
    return called
  }

  it('should call debug', () => {
    expect(sendMessageWithSettings({ tty: true })).toBeTruthy()
  })

  it('should not call debug without a tty', () => {
    expect(sendMessageWithSettings({ tty: false })).toBeFalsy()
  })
})
