import Time from '../../src/util/time'

describe('util', () => {
  describe('Time', () => {
    const dateTime = new Date('01/01/2000')
    describe('format', () => {
      it('formats a time object in M d format', () => {
        expect(Time.format('M d', dateTime)).toBe('Jan 1')
      })

      it('returns the same object when format unknown', () => {
        expect(Time.format('', dateTime)).toBe(dateTime)
      })
    })

    describe('shortMonthName', () => {
      it('returns Jan when given January', () => {
        expect(Time.shortMonthName('January')).toBe('Jan')
      })

      it('returns Feb when given Febu', () => {
        expect(Time.shortMonthName('Febu')).toBe('Feb')
      })

      it('returns mar when given march', () => {
        expect(Time.shortMonthName('march')).toBe('mar')
      })

      it('returns Apr when given Apr', () => {
        expect(Time.shortMonthName('Apr')).toBe('Apr')
      })

      it('returns Apr when given Apr', () => {
        expect(Time.shortMonthName('Apr')).toBe('Apr')
      })

      it('returns empty string when given empty string', () => {
        expect(Time.shortMonthName('')).toBe('')
      })
    })

    describe('toIsoStripped', () => {
      it('return 19991231T230000000Z when given new Date(01/01/2000)', () => {
        expect(Time.toIsoStripped(dateTime)).toBe('19991231T230000000Z')
      })
    })
  })
})
