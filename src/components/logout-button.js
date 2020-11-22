import SolidAuthClient from 'solid-auth-client';
import Button from '../../lib/button.js';
import store from '../store/index.js';

export default class LogoutButton extends Button {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-button--logout')
    });
    this.element.addEventListener('click', () => {
      SolidAuthClient.logout();
      store.dispatch('setSession', null);
    })
  }

  render() {
    if (store.state.session == '' || store.state.session == null) {
      this.disableButton()
    } else {
      this.enableButton()
    }
  }
}
