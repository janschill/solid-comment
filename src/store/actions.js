export default {
  setComments (context, payload) {
    context.commit('setComments', payload)
  },
  setSession (context, payload) {
    context.commit('setSession', payload)
  },
  setWebId (context, payload) {
    context.commit('setWebId', payload)
  },
  setFormInput (context, payload) {
    context.commit('setFormInput', payload)
  }
}
