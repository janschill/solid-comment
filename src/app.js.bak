import SolidAuthClient from 'solid-auth-client';
import DomNodeCreator from './dom-node-creator.js';
import * as Util from './util.js'

const domNodeCreator = new DomNodeCreator();
domNodeCreator.createCommentModule();
attachSolidLoginToSolidCommentButton();

async function attachSolidLoginToSolidCommentButton() {
  async function popupLogin() {
    const session = await SolidAuthClient.currentSession();
    let popupUri = 'https://solidcommunity.net/common/popup.html';
    if (!session) {
      session = await SolidAuthClient.popupLogin({ popupUri });
      console.log(session.webId);
    }
    alert(`Logged in as ${session.webId}`);
  }

  Util.executeOnDOMReady(() => {
    domNodeCreator.$commentNode.$loginButton.$node.addEventListener('click', () => {
      popupLogin();
    });
    domNodeCreator.$commentNode.$logoutButton.$node.addEventListener('click', () => {
      SolidAuthClient.logout();
    });
  });
}
