export default {
  setSession(state, payload) {
    state.session = payload;

    return state;
  },
  updateInput(state, payload) {
    state.input = payload;

    return state;
  },
  setComments(state, payload) {
    state.comments = payload;

    return state;
  },
  addComment(state, payload) {
    state.comments.push(payload);

    return state;
  }
}
