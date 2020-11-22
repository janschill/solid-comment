import Component from '../../lib/component.js';
import store from '../store/index.js';

export default class Input extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-input')
    });
    this.element.addEventListener('input', () => {
      store.dispatch('updateInput', this.element.value);
    })
  }

  render() {
    this.element.innerHTML = store.state.input;
  }
}
