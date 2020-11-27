import './styles.css';
import { trackSession } from 'solid-auth-client';
import store from './store/index.js';
import SolidClient from './solid-client.js';
import Home from './pages/home.js';
import Comment from './models/comment.js';

class App {
  constructor() {
    new Home().renderComponents();
    // if session
    //   connect to pod
    //   load comments
    // else
    //   show login
    //   no comments here

    const session = await this.checkSession();
    if (session) {
      Comment.all()
      this.loadComments();
    }
  }

  async loadComments() {
    const solidClient = new SolidClient();
    const commentContainer = '/solid-comment/';
    const commentFileValue = await solidClient.get(`${commentContainer}text.text`);
    store.dispatch('setComments', await commentFileValue.text());
  }

  async checkSession() {
    trackSession(session => {
      if (session) {
        store.dispatch('setSession', session.webId);
        return session;
      }
      return store.state.session;
    });
  }
}

new App();
