import { originFromUrl } from '../../src/util/url'

describe('util', () => {
  describe('originFromUrl', () => {
    it('returns the origin from a https URL string', () => {
      expect(originFromUrl('https://example.org/test')).toBe('https://example.org')
    })

    it('returns the origin from a https URL string', () => {
      expect(originFromUrl('http://example.org/test')).toBe('http://example.org')
    })

    it('returns undefined on empty string parameter', () => {
      expect(originFromUrl('')).toBe(undefined)
    })

    it('returns the origin from a URL string', () => {
      expect(originFromUrl(new URL('https://example.org/test'))).toBe(undefined)
    })
  })
})
