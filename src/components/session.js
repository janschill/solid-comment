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
    this.element.innerHTML = `Current session: ${store.state.session.webId}`;
  }
}
