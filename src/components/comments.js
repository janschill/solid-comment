import Component from '../../lib/component.js';
import store from '../store/index.js';
import DOMNode from '../dom-node.js';

export default class Comments extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-list')
    });
  }

  async render() {
    let outerHTMLComments = '';

    store.state.comments.forEach(comment => {
      outerHTMLComments += new DOMNode({
        type: 'li',
        innerHTML: comment.message || 'null',
        classList: []
      }).$node.outerHTML;
    });

    this.element.innerHTML = outerHTMLComments;
  }
}
