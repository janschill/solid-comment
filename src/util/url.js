export function originFromUrl (url) {
  if (typeof url === 'string' && url.includes('http')) { return new URL(url).origin }
}

export function hasHttp (urlString) {
  return urlString.search(/^http:\/\//) === 0
}

export function hasHttps (urlString) {
  return urlString.search(/^https:\/\//) === 0
}

export function setHttps (urlString) {
  if (urlString !== '' && !hasHttps(urlString)) {
    if (hasHttp(urlString)) {
      urlString = urlString.replace('http', 'https')
    } else {
      urlString = `https://${urlString}`
    }
  }
  return urlString
}
