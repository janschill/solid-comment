export function originFromUrl (url) {
  if (typeof url === 'string' && url.includes('http')) { return new URL(url).origin }
}
