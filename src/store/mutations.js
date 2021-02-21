export default {
  addComment(state, payload) {
    state.comments.push(payload);

    return state;
  },
  setComments(state, payload) {
    state.comments = payload;

    return state;
  },
  setSession(state, payload) {
    state.session = payload;

    return state;
  },
}
