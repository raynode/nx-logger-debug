
import * as debug from 'debug'

let handler: Partial<debug.IDebug> = debug
export const setMockHandler = (mockHandler: any) => handler = mockHandler

const d: any = (arg, ...args: any[]) => (handler as any)(arg, ...args)
d.setMockHandler = setMockHandler

module.exports = d
