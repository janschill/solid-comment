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
    this.createLoginButton();
    this.createLogoutButton();
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

  createLoginButton() {
    this.$loginButton = new DOMNode({
      type: 'button',
      innerHTML: 'Login with Solid',
      classList: ['solid-comment-button', 'solid-comment-button--login']
    })
    this.$loginButton.append(this.$node);
  }

  createLogoutButton() {
    this.$logoutButton = new DOMNode({
      type: 'button',
      innerHTML: 'Logout',
      classList: ['solid-comment-button', 'solid-comment-button--logout']
    })
    this.$logoutButton.append(this.$node);
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
