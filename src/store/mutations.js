export default {
  setComments (state, payload) {
    state.comments = payload

    return state
  },
  setErrorMessage (state, payload) {
    state.errorMessage = payload

    return state
  },
  setSession (state, payload) {
    state.session = payload

    return state
  },
  setCommentInput (state, payload) {
    state.commentInput = payload

    return state
  }
}
