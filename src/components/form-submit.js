import { Comment } from "../models/comment";
import { SolidClient } from "../solid/solid-client";
import Component from "./component";
import SolidAgent from "../models/solid-agent";
import store from "../store/index";

export default class FormSubmit extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".sc-comment-form__submit")
    });
    this.element.onclick = async (event) => {
      event.preventDefault();
      // make sure we get a value here
      // sanitize the value
      const inputValue = store.state.formInput;
      // make sure we have a session here
      const currentUser = store.state.webId;
      console.log(currentUser)
      // let's not create a new agent but rather persist and use it from session
      const currentAgent = new SolidAgent();
      await currentAgent.fetchProfile(currentUser);
      const comment = new Comment({
        author: currentAgent,
        time: new Date(),
        text: inputValue,
      });
      // could be improved with push comment
      const comments = store.state.comments;
      comments.push(comment)
      store.dispatch("setComments", comments);
    }
  }

  render() {
    if (store.state.formInput === "") {
      this.disableElement();
    } else {
      this.enableElement();
    }
  }
}
