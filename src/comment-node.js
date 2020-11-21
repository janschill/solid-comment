import DOMNode from './dom-node.js';

export default class CommentNode extends DOMNode {
  constructor() {
    super({
      type: 'div',
      innerHTML: '',
      classList: []
    });

    this.createList();
  }

  createList() {
    this.$ul = new DOMNode({
      type: 'ul',
      innerHTML: '',
      classList: ['solid-comment-list']
    });
    this.$ul.append(this.$node);
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
