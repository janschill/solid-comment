import store from '../store/index.js';
import Component from '../../lib/component.js';
import CommentNode from '../comment-node.js';

export default class Comment extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-parent-node')
    });
  }

  render() {
    const commentNode = new CommentNode();
    this.element.innerHTML = commentNode.$node.innerHTML
  }
}
