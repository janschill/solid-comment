import store from './store/index.js';
import { trackSession } from 'solid-auth-client';
import './styles.css';
import SolidClient from './solid-client.js';

import Session from './components/session.js';
import LoginButton from './components/login-button.js';
import LogoutButton from './components/logout-button.js';
import SendButton from './components/send-button.js';
import Input from './components/input.js';
import Comments from './components/comments.js';

class App {
  constructor() {
    const components = this.create();
    this.render(components);
    this.checkSession();
    this.loadComments();
  }

  async loadComments() {
    const solidClient = new SolidClient();
    const commentContainer = '/solid-comment/';
    const commentFileValue = await solidClient.get(`${commentContainer}text.text`);
    store.dispatch('setComments', await commentFileValue.text());
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
      comments: new Comments(),
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

new App();
