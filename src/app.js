import store from './store/index.js';
import { trackSession } from 'solid-auth-client';
import './styles.css'

import Session from './components/session.js';
import LoginButton from './components/login-button.js';
import LogoutButton from './components/logout-button.js';
import SendButton from './components/send-button.js';
import Input from './components/input.js';

async function checkSession() {
  trackSession(solidSession => {
    if (solidSession) {
      store.dispatch('setSession', solidSession.webId);
    }
  });
}

function create() {
  return {
    session: new Session(),
    loginButton: new LoginButton(),
    logoutButton: new LogoutButton(),
    sendButton: new SendButton(),
    input: new Input(),
  }
}

function render(components) {
  for (const key in components) {
    if (components.hasOwnProperty(key)) {
      components[key].render()
    }
  }
}

const components = create();
render(components);
checkSession()
