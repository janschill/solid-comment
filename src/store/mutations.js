export default {
  addComment(state, payload) {
    state.comments.push(payload);

    return state;
  },
  setWebId(state, payload) {
    state.webId = payload;

    return state;
  },
  updateFormInput(state, payload) {
    state.formInput = payload;

    return state;
  },
}
