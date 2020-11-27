import { logout } from 'solid-auth-client';
import Button from '../../lib/button.js';
import store from '../store/index.js';

export default class LogoutButton extends Button {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-button--logout')
    });
    this.element.addEventListener('click', () => {
      logout();
      store.dispatch('setSession', null);
    })
  }

  render() {
    if (
      store.state.session == '' ||
      store.state.session == null ||
      store.state.session == {}
    ) {
      this.disableButton()
    } else {
      this.enableButton()
    }
  }
}
