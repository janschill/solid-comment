import SolidClient from '../solid-client.js';
import Button from '../../lib/button.js';
import store from '../store/index.js';

export default class SendButton extends Button {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-button--send')
    });
    const solidClient = new SolidClient();
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('input:', store.state.input);
      solidClient.put(store.state.input);
    })
  }

  render() {
    if (store.state.input == '' || store.state.input == null) {
      // this.disableButton();
    } else {
      // this.enableButton();
    }
  }
}
