export default class Store {
  constructor (parameters) {
    const self = this

    self.actions = {}
    self.mutations = {}
    self.state = {}

    self.status = 'resting'
    self.callbacks = []

    if (Object.prototype.hasOwnProperty.call(parameters, 'actions')) {
      self.actions = parameters.actions
    }

    if (Object.prototype.hasOwnProperty.call(parameters, 'mutations')) {
      self.mutations = parameters.mutations
    }

    self.state = new Proxy((parameters.initialState || {}), {
      set: (state, key, value) => {
        state[key] = value
        self.processCallbacks(self.state)
        self.status = 'resting'
        return true
      }
    })
  }

  dispatch (actionKey, payload) {
    const self = this

    if (typeof self.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey}" does not exist.`)
      return false
    }

    self.status = 'action'
    self.actions[actionKey](self, payload)

    return true
  }

  commit (mutationKey, payload) {
    const self = this

    if (typeof self.mutations[mutationKey] !== 'function') {
      return false
    }

    self.status = 'mutation'

    const newState = self.mutations[mutationKey](self.state, payload)
    self.state = newState

    return true
  }

  processCallbacks (data) {
    const self = this

    if (!self.callbacks.length) {
      return false
    }

    self.callbacks.forEach(callback => callback(data))

    return true
  }

  subscribe (callback) {
    const self = this

    if (typeof callback !== 'function') {
      console.error('You cann only subscribe to Store changes with a valid function')
      return false
    }

    self.callbacks.push(callback)

    return true
  }
}
