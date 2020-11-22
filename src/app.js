import store from './store/index.js';
import { trackSession } from 'solid-auth-client';
import './styles.css'

import Session from './components/session.js';
import LoginButton from './components/login-button.js';
import LogoutButton from './components/logout-button.js';

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
  }
}

function render(components) {
  components.session.render();
  components.loginButton.render();
  components.logoutButton.render();
}

const components = create();
render(components);
checkSession()
