import Home from './pages/home.js';
import Comment from './models/comment.js';

class App {
  constructor() {
    new Home().instantiateComponents();
  }

  async load() {
    Comment.all()
  }
}

const app = new App();
app.load();
