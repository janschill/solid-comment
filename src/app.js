import SolidAuthClient from 'solid-auth-client';
import DomNodeCreator from './dom-node-creator.js';
import * as Util from './util.js'

class App {
  static async main() {
    this.domNodeCreator = new DomNodeCreator();
    this.domNodeCreator.createCommentModule();
    App.attachSolidLoginToSolidCommentButton();
    this.session = await SolidAuthClient.currentSession();
    console.log(this.session);
  }

  static attachSolidLoginToSolidCommentButton() {
    async function popupLogin() {
      let popupUri = 'https://solidcommunity.net/common/popup.html';
      if (!this.session) {
        this.session = await SolidAuthClient.popupLogin({ popupUri });
        console.log(this.session.webId);
      }
      alert(`Logged in as ${this.session.webId}`);
    }

    Util.executeOnDOMReady(() => {
      this.domNodeCreator.$commentNode.$loginButton.$node.addEventListener('click', () => {
        popupLogin();
      });
      this.domNodeCreator.$commentNode.$logoutButton.$node.addEventListener('click', () => {
        SolidAuthClient.logout();
      });
    });
  }
}

App.main()
