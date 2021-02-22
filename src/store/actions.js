export default {
  pushComment(context, payload) {
    context.commit("pushComment", payload);
  },
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
