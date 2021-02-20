import Component from '../component';
import store from "../store/index"

export default class Session extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-session')
    });
  }

  render() {
    const content = store.state.session ? `Current session: ${store.state.session}` : ""
    this.element.innerHTML = content;
  }
}
