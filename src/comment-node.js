import Node from '../libs/node/node.js';

export default class CommentNode extends Node {
  constructor() {
    super({
      type: 'div',
      textContent: '',
    });
  }
}
