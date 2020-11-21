import DOMNode from './dom-node.js';

export default class CommentNode extends DOMNode {
  constructor() {
    super({
      type: 'div',
      innerHTML: '',
      classList: ['solid-comment-container']
    });

    this.createTitle();
    this.createList();
    this.createLogin();
  }

  createTitle() {
    this.$title = new DOMNode({
      type: 'h2',
      innerHTML: 'Comments',
      classList: ['solid-comment-title']
    });
    this.$title.append(this.$node);
  }

  createList() {
    this.$ul = new DOMNode({
      type: 'ul',
      innerHTML: '',
      classList: ['solid-comment-list']
    });
    this.$ul.append(this.$node);
  }

  createLogin() {
    this.$login = new DOMNode({
      type: 'button',
      innerHTML: 'Login with Solid',
      classList: ['solid-comment-button', 'solid-comment-button--login']
    })
    this.$login.append(this.$node);
  }
}

/**
 * Container
 * List of comments
 * Login
 * Comment field + button
 *
 *
 *
 *
 */
