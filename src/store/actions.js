export default {
  setSession(context, payload) {
    context.commit('setSession', payload)
  },
  updateInput(context, payload) {
    context.commit('updateInput', payload)
  },
  setComments(context, payload) {
    context.commit('setComments', payload)
  },
  setClient(context, payload) {
    context.commit('setClient', payload);
  },
  addComment(context, payload) {
    context.commit('addComment', payload);
  }
}
