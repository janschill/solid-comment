export default {
  pushComment(context, payload) {
    context.commit("pushComment", payload);
  },
  setComments(context, payload) {
    context.commit("setComments", payload);
  },
  setSession(context, payload) {
    context.commit("setSession", payload);
  },
}
