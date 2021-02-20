let configuration = {}

export function addObjectToConfig(object) {
  configuration = {...configuration, ...object}
}

export function config() {
  return configuration
}

export function addToConfig(key, value) {
  return configuration[key] = value
}
