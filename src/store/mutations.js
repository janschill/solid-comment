export default {
  setComments (state, payload) {
    state.comments = payload

    return state
  },
  setSession (state, payload) {
    state.session = payload

    return state
  },
  setWebId (state, payload) {
    state.webId = payload

    return state
  },
  setFormInput (state, payload) {
    state.formInput = payload

    return state
  }
}
