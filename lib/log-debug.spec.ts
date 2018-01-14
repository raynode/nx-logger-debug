
import { transport } from './log-debug'
import * as debug from './__mocks__/debug'
import { configure, create } from '@raynode/nx-logger'
import * as faker from 'faker'

const { setMockHandler } = debug

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50

describe('nx-logger-debug with tty', () => {
  beforeEach(() => {
    configure({ transport, tty: true })
  })

  it('should call debug with the given parameters', () => {
    const in_ns = [faker.random.word(), faker.random.word()]
    const in_msg = faker.random.word()
    const log = create(...in_ns)
    let called = false
    setMockHandler(ns => {
      return (formatter: any, ...args: any[]) => {
        expect(ns).toEqual(in_ns.join(':'))
        expect(formatter).toEqual(in_msg)
        called = true
      }
    })
    log(in_msg)
    expect(called).toBeTruthy()
  })
})

describe('nx-logger-debug without tty', () => {
  beforeEach(() => {
    configure({ transport, tty: false })
  })

  it('should call debug with the given parameters', () => {
    const in_ns = [faker.random.word(), faker.random.word()]
    const in_msg = faker.random.word()
    const log = create(...in_ns)
    let called = false
    setMockHandler(ns => {
      return (formatter: any, ...args: any[]) => {
        expect(ns).toEqual(in_ns.join(':'))
        expect(formatter).toEqual(in_msg)
        called = true
      }
    })
    log(in_msg)
    expect(called).toBeFalsy()
  })
})
