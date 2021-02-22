let configuration = {}

export function addObjectToConfig (object) {
  configuration = { ...configuration, ...object }
}

export function config () {
  return configuration
}

export function addToConfig (key, value) {
  configuration[key] = value
  return configuration
}
