export default {
  setComments(context, payload) {
    context.commit("setComments", payload);
  },
  setWebId(context, payload) {
    context.commit("setWebId", payload);
  },
  updateFormInput(context, payload) {
    context.commit("updateFormInput", payload);
  },
}
