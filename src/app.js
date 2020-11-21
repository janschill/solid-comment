import SolidAuthClient from 'solid-auth-client';
import DomNodeCreator from './dom-node-creator.js';
import * as Util from './util.js'

class App {
  main() {
    const domNodeCreator = new DomNodeCreator()
    domNodeCreator.createCommentModule()

    async function popupLogin() {
      let session = await SolidAuthClient.currentSession();
      let popupUri = 'https://solidcommunity.net/common/popup.html';
      if (!session) {
        session = await SolidAuthClient.popupLogin({ popupUri });
      }
      alert(`Logged in as ${session.webId}`);
    }

    SolidAuthClient.trackSession(session => {
      if (!session)
        alert('Hello stranger!');
      else
        alert(`Hello ${session.webId}!`);
    });

    Util.executeOnDOMReady(() => {
      domNodeCreator.$commentNode.$loginButton.$node.addEventListener('click', () => {
        popupLogin();
      });
      domNodeCreator.$commentNode.$logoutButton.$node.addEventListener('click', () => {
        SolidAuthClient.logout();
      });
    });

  }
}

new App().main()
