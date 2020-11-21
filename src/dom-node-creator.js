import CommentNode from './comment-node.js';

export default class DomNodeCreator {
  constructor(parentNodeId = 'solid-comment-parent-node') {
    this.parentNodeId = parentNodeId;
  }

  getParentNode() {
    return document.querySelector(`#${this.parentNodeId}`);
  }

  createCommentModule() {
    document.addEventListener('DOMContentLoaded', () => {
      this.$parentNode = this.getParentNode();
      this.$commentNode = new CommentNode();
      this.$commentNode.append(this.$parentNode);
    });
  }
}
