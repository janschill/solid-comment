export const memoize = (fn) => {
  const cache = {}
  return (...args) => {
    const n = args[0] // just taking one argument here
    if (n in cache) {
      console.log('Fetching from cache')
      return cache[n]
    } else {
      console.log('Calculating result')
      const result = fn(n)
      cache[n] = result
      return result
    }
  }
}
