import Node from './node/node.js';

export default class CommentNode extends Node {
  constructor() {
    super({
      type: 'div',
      textContent: '',
    });
  }
}
