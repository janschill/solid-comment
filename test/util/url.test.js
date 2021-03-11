import { originFromUrl } from '../../src/util/url'

test('Formats a URL', () => {
  expect(originFromUrl('https://example.org')).toBe('example.org')
})
