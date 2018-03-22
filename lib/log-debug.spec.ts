
import * as faker from 'faker'

import { configure, create } from '@raynode/nx-logger'

import * as debug from './__mocks__/debug'
import { transport } from './log-debug'

const { setMockHandler } = debug

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50

describe('nx-logger-debug with tty', () => {
  beforeEach(() => configure({ transport, tty: true }))

  it('should call debug with the given parameters', () => {
    const inNs = [faker.random.word(), faker.random.word()]
    const inMsg = faker.random.word()
    const log = create(...inNs)
    let called = false
    setMockHandler(ns => {
      return (formatter: any, ...args: any[]) => {
        expect(ns).toEqual(inNs.join(':'))
        expect(formatter).toEqual(inMsg)
        called = true
      }
    })
    log(inMsg)
    expect(called).toBeTruthy()
  })
})

describe('nx-logger-debug without tty', () => {
  beforeEach(() => configure({ transport, tty: false }))

  it('should call debug with the given parameters', () => {
    const inNs = [faker.random.word(), faker.random.word()]
    const inMsg = faker.random.word()
    const log = create(...inNs)
    let called = false
    setMockHandler(ns => {
      return (formatter: any, ...args: any[]) => {
        expect(ns).toEqual(inNs.join(':'))
        expect(formatter).toEqual(inMsg)
        called = true
      }
    })
    log(inMsg)
    expect(called).toBeFalsy()
  })
})
