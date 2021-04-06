import { hasHttp, hasHttps, originFromUrl, setHttps } from '../../../src/util/url'

describe('url', () => {
  describe('setHttps', () => {
    it('returns the passed in string with the protocol attached when it does not exist', () => {
      expect(setHttps('example.org')).toBe('https://example.org')
    })
    it('returns the passed in string with the protocol attached when it does not exist, also with www', () => {
      expect(setHttps('www.example.org')).toBe('https://www.example.org')
    })
    it('returns the same string when it already has a valid protocol', () => {
      expect(setHttps('https://www.example.org')).toBe('https://www.example.org')
    })
    it('returns the same string when it already has a valid protocol', () => {
      expect(setHttps('http://www.example.org')).toBe('https://www.example.org')
    })
    it('returns the same string when it receives an empty string', () => {
      expect(setHttps('')).toBe('')
    })
  })

  describe('hasHttps', () => {
    it('returns true when protocol is in urlString', () => {
      expect(hasHttps('https://example.org')).toBeTruthy()
    })

    it('returns false when protocol is not in urlString', () => {
      expect(hasHttps('http://example.org')).toBeFalsy()
    })

    it('returns false when protocol is in urlString, but not in the beginning', () => {
      expect(hasHttps('https.org')).toBeFalsy()
    })

    it('returns false when given empty string', () => {
      expect(hasHttps('')).toBeFalsy()
    })
  })

  describe('hasHttp', () => {
    it('returns true when protocol is in urlString', () => {
      expect(hasHttp('http://example.org')).toBeTruthy()
    })

    it('returns false when protocol is not in urlString', () => {
      expect(hasHttp('https://example.org')).toBeFalsy()
    })

    it('returns false when protocol is in urlString, but not in the beginning', () => {
      expect(hasHttp('http.org')).toBeFalsy()
    })

    it('returns false when given empty string', () => {
      expect(hasHttp('')).toBeFalsy()
    })
  })

  describe('originFromUrl', () => {
    it('returns the origin from a https URL string', () => {
      expect(originFromUrl('https://example.org/test')).toBe('https://example.org')
    })

    it('returns the origin from a http URL string', () => {
      expect(originFromUrl('http://example.org/test')).toBe('http://example.org')
    })

    it('returns undefined on empty string parameter', () => {
      expect(originFromUrl('')).toBe(undefined)
    })

    it('returns undefined when not given an URL string', () => {
      expect(originFromUrl(new URL('https://example.org/test'))).toBe(undefined)
    })
  })
})
