import { currentSession, popupLogin } from 'solid-auth-client';
import Button from '../../lib/button.js';
import store from '../store/index.js';

export default class LoginButton extends Button {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-button--login')
    });
    this.element.addEventListener('click', () => {
      this.popupLogin();
    })
  }

  render() {
    if (
      store.state.session == '' ||
      store.state.session == null ||
      store.state.session == {}
    ) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  }

  async popupLogin() {
    let sesssion = await currentSession();
    const popupUri = 'https://solidcommunity.net/common/popup.html';
    if (!sesssion) {
      sesssion = await popupLogin({ popupUri });
      store.dispatch('setSession', sesssion.webId);
      console.log(sesssion.webId);
    }
  }
}
