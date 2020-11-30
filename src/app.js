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
    Comment.all()
    // const client = new SolidClient();
    // const session = client.session();
  }
}

const app = new App();
app.load();
