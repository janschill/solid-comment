import Store from '../../../src/store/store'

const actions = {
  setTestState (context, payload) {
    context.commit('setTestState', payload)
  }
}

const mutations = {
  setTestState (state, payload) {
    state.testState = payload

    return state
  }
}

const initialState = {
  testState: {
    state: 'idle',
    data: []
  }
}

const store = new Store({
  actions,
  mutations,
  initialState
})

describe('Store', () => {
  describe('store', () => {
    it('holds the state when it get one passed in initially', () => {
      expect(store.state).toEqual({ testState: { state: 'idle', data: [] } })
    })

    it('holds the state when it get one passed in initially', () => {
      const testStateState = store.state.testState.state
      store.dispatch('setTestState', { state: testStateState, data: [1, 2, 3] })

      expect(store.state).toEqual({ testState: { state: 'idle', data: [1, 2, 3] } })
    })
  })
})
