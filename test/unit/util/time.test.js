import Time from '../../../src/util/time'

describe('util', () => {
  describe('Time', () => {
    const dateTime = new Date(2000, 0, 1, 1, 1, 1, 1)

    // TODO: add tests for when a string is passed
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

    describe('fromStrippedToDate', () => {
      it('turn 20210225T144227Z into 2021-02-25T14:42:27Z', () => {
        const strippedTime = '20210225T144227Z'
        const unstrippedTime = '2021-02-25T14:42:27Z'
        expect(Time.fromStrippedToDate(strippedTime)).toBe(unstrippedTime)
      })

      it('returns a JavaScript Date object from a stripped time string', () => {
        const dateTimeObject = new Date()
        const strippedTime = Time.toIsoStripped(dateTimeObject)
        expect(Time.fromStrippedToDate(strippedTime)).toBe(dateTimeObject.toISOString().split('.')[0] + 'Z')
      })
    })
  })

  const jsDate = new Date(1970, 0, 1, 13, 0, 0, 0)
  const strippedIsoTimeString = '19700101T120000Z' // month and hour start at 0
  const isoTimeStringWithMilliseconds = '1970-01-01T12:00:00.123Z' // month and hour start at 0
  const isoTimeStringWithoutMilliseconds = '1970-01-01T12:00:00Z' // month and hour start at 0

  describe('trimSymbols', () => {
    it('returns the same string when symbols already trimmed', () => {
      expect(Time.trimSymbols(strippedIsoTimeString)).toBe(strippedIsoTimeString)
    })
    it('returns the same parameter when given a JS object', () => {
      expect(Time.trimSymbols(jsDate)).toBe(jsDate)
    })
    it('returns the same parameter when given an invalid time string', () => {
      expect(Time.trimSymbols(strippedIsoTimeString.substring(0, 10))).toBe(strippedIsoTimeString.substring(0, 10))
    })
    it('returns a string without any colons', () => {
      expect(Time.trimSymbols(isoTimeStringWithoutMilliseconds).includes(':')).toBeFalsy()
    })
    it('returns a string without any underscores', () => {
      expect(Time.trimSymbols(isoTimeStringWithoutMilliseconds).includes('_')).toBeFalsy()
    })
    it('returns a string without any dashes', () => {
      expect(Time.trimSymbols(isoTimeStringWithoutMilliseconds).includes('-')).toBeFalsy()
    })
    it('returns a string without any dashes', () => {
      expect(Time.trimSymbols(isoTimeStringWithoutMilliseconds).includes('.')).toBeFalsy()
    })
    it('contains Z character', () => {
      expect(Time.trimSymbols(isoTimeStringWithoutMilliseconds).includes('Z')).toBeTruthy()
    })
    it('contains T character', () => {
      expect(Time.trimSymbols(isoTimeStringWithoutMilliseconds).includes('T')).toBeTruthy()
    })
  })

  describe('trimMilliseconds', () => {
    it('returns the same string when milliseconds already trimmed', () => {
      expect(Time.trimMilliseconds(strippedIsoTimeString)).toBe(strippedIsoTimeString)
    })
    it('returns the same parameter when given a JS object', () => {
      expect(Time.trimMilliseconds(jsDate)).toBe(jsDate)
    })
    it('returns the same parameter when given an invalid time string', () => {
      expect(Time.trimMilliseconds(strippedIsoTimeString.substring(0, 10))).toBe(strippedIsoTimeString.substring(0, 10))
    })
    it('trims milliseconds from 19700101T120000123Z', () => {
      expect(Time.trimMilliseconds(isoTimeStringWithMilliseconds)).toBe(isoTimeStringWithoutMilliseconds)
    })
    it('returns a string of length 21', () => {
      expect(Time.trimMilliseconds(isoTimeStringWithMilliseconds).length).toBe(20)
    })
  })

  describe('jsToIso8601Strip', () => {
    describe('turn JavaScript date object into ISO 8601 string stripped of symbols', () => {
      it('returns a string of length 16', () => {
        expect(Time.jsToIso8601Strip(jsDate).length).toBe(16)
      })
      it('returns a string without any colons', () => {
        expect(Time.jsToIso8601Strip(jsDate).includes(':')).toBeFalsy()
      })
      it('returns a string without any underscores', () => {
        expect(Time.jsToIso8601Strip(jsDate).includes('_')).toBeFalsy()
      })
      it('returns a string without any dashes', () => {
        expect(Time.jsToIso8601Strip(jsDate).includes('-')).toBeFalsy()
      })
      it('returns a string without any dashes', () => {
        expect(Time.jsToIso8601Strip(jsDate).includes('.')).toBeFalsy()
      })
      it('contains Z character', () => {
        expect(Time.jsToIso8601Strip(jsDate).includes('Z')).toBeTruthy()
      })
      it('contains T character', () => {
        expect(Time.jsToIso8601Strip(jsDate).includes('T')).toBeTruthy()
      })
      it.skip('turns JS new Date(1970, 1, 1, 12, 0, 0) into 19700101T120000Z', () => {
        expect(Time.jsToIso8601Strip(jsDate)).toBe(strippedIsoTimeString)
      })
      it('returns the parameter if not given a valid JS Date object', () => {
        expect(Time.jsToIso8601Strip(strippedIsoTimeString)).toBe(strippedIsoTimeString)
      })
    })
  })
})
