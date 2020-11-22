import store from './store/index.js';

// Import components
import Session from './components/session.js';
import Comment from './components/comment.js';

// Instantiate components
const session = new Session();
const comment = new Comment();

// Render components
session.render();
comment.render();
