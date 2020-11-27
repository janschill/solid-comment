import './styles.css';
import { trackSession } from 'solid-auth-client';
import store from './store/index.js';
import SolidClient from './solid-client.js';
import Home from './pages/home.js';

class App {
  constructor() {
    new Home().renderComponents();
    // if session
    //   connect to pod
    //   load comments
    // else
    //   show login
    //   no comments here

  }
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
}

new App();
