import './styles.css';
import { trackSession } from 'solid-auth-client';
import store from './store/index.js';
import SolidClient from './solid-client.js';
import Home from './pages/home.js';
import Comment from './models/comment.js';

class App {
  constructor() {
    new Home().instantiateComponents();
    // if session
    //   connect to pod
    //   load comments
    // else
    //   show login
    //   no comments here

  }

  async load() {
    // const client = new SolidClient();
    // const session = client.session();

    // if (session) {
    Comment.all()
    // this.loadComments();
    // }
  }
}

const app = new App();
app.load();
