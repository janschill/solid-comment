import Component from '../../lib/component.js';
import store from '../store/index.js';
import state from '../store/state.js';
import DOMNode from '../dom-node.js';

export default class Comments extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-list')
    });
  }

  render() {
    let outerHTMLComments = '';
    store.state.comments.forEach(comment => {
      outerHTMLComments += new DOMNode({
        type: 'li',
        innerHTML: comment,
        classList: []
      }).$node.outerHTML;
    });
    this.element.innerHTML = outerHTMLComments;
  }
}
