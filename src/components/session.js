import Component from '../../lib/component.js';
import store from '../store/index.js';

export default class Session extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-session')
    });
  }

  render() {
    this.element.innerHTML = `Current session: ${store.state.session}`;
  }
}
