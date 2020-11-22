import store from './store/index.js';
import SolidAuthClient from 'solid-auth-client';
import * as Util from './util.js'
import './styles.css'

// Import components
import Session from './components/session.js';
import Comment from './components/comment.js';

// Instantiate components
const session = new Session();
const comment = new Comment();

// Render components
session.render();
comment.render();

SolidAuthClient.trackSession(solidSession => {
  if (solidSession)
    store.dispatch('setSession', solidSession.webId);
});

async function attachSolidLoginToSolidCommentButton() {
  async function popupLogin() {
    let solidSession = await SolidAuthClient.currentSession();
    let popupUri = 'https://solidcommunity.net/common/popup.html';
    if (!solidSession) {
      solidSession = await SolidAuthClient.popupLogin({ popupUri });
      store.dispatch('setSession', solidSession.webId);
      console.log(solidSession.webId);
    }
    alert(`Logged in as ${solidSession.webId}`);
  }

  Util.executeOnDOMReady(() => {
    const $loginButton = comment.element.querySelector('.solid-comment-button--login');
    $loginButton.addEventListener('click', () => {
      popupLogin();
    });
    const $logoutButton = comment.element.querySelector('.solid-comment-button--logout');
    $logoutButton.addEventListener('click', () => {
      SolidAuthClient.logout();
    });
  });
}

attachSolidLoginToSolidCommentButton();
