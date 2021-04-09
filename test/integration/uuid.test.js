import { v4 as uuidv4 } from 'uuid'

describe('uuid', () => {
  describe('uuidv4', () => {
    it('does not return the same string on consecutive calls', () => {
      expect(uuidv4()).not.toBe(uuidv4())
    })
    it('returns a string', () => {
      const uuid = uuidv4()
      expect(typeof uuid === 'string' || uuid instanceof String).toBeTruthy()
    })
  })
})
