
import { transport } from './log-debug'
import * as debug from './__mocks__/debug'
import { configure, create } from '@raynode/nx-logger'
import * as faker from 'faker'

const { setMockHandler } = debug

describe('nx-logger-debug with tty', () => {
  beforeEach(() => {
    configure({ transport, tty: true })
  })

  it('should call debug with the given parameters', done => {
    const in_ns = [faker.random.word(), faker.random.word()]
    const in_msg = faker.random.word()
    const log = create(...in_ns)
    setMockHandler(ns => {
      return (formatter: any, ...args: any[]) => {
        expect(ns).toEqual(in_ns.join(':'))
        expect(formatter).toEqual(in_msg)
        done()
      }
    })
    log(in_msg)
  })
})
