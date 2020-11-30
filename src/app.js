import Home from './pages/home.js';
import Comment from './models/comment.js';
import store from './store/index.js';
import SolidClient from './solid-client.js';

class App {
  constructor() {
    const client = new SolidClient();
    client.login()
    store.dispatch('setClient', client);
    new Home().instantiateComponents();
  }

  async load() {
    Comment.all()
  }
}

const app = new App();
app.load();
