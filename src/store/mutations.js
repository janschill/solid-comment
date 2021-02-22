export default {
  addComment(state, payload) {
    state.comments.push(payload);

    return state;
  },
  setWebId(state, payload) {
    state.webId = payload;

    return state;
  },
  setSession(state, payload) {
    state.session = payload;

    return state;
  },
}
