import store from './store/index.js';
import { trackSession } from 'solid-auth-client';
import './styles.css'

import Session from './components/session.js';
import LoginButton from './components/login-button.js';
import LogoutButton from './components/logout-button.js';
import SendButton from './components/send-button.js';
import Input from './components/input.js';

class App {
  constructor() {
    const components = this.create();
    this.render(components);
    this.checkSession()
  }

  async checkSession() {
    trackSession(solidSession => {
      if (solidSession) {
        store.dispatch('setSession', solidSession.webId);
      }
    });
  }

  create() {
    return {
      session: new Session(),
      loginButton: new LoginButton(),
      logoutButton: new LogoutButton(),
      sendButton: new SendButton(),
      input: new Input(),
    }
  }

  render(components) {
    for (const key in components) {
      if (components.hasOwnProperty(key)) {
        components[key].render()
      }
    }
  }
}

new App()
