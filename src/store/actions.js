export default {
  setComments (context, payload) {
    context.commit('setComments', payload)
  },
  setErrorMessage (context, payload) {
    context.commit('setErrorMessage', payload)
  },
  setSession (context, payload) {
    context.commit('setSession', payload)
  },
  setCommentInput (context, payload) {
    context.commit('setCommentInput', payload)
  }
}
