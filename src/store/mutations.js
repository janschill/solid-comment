export default {
  setSession(state, payload) {
    state.session = payload;

    return state;
  },
  updateInput(state, payload) {
    state.input = payload
  }
}
