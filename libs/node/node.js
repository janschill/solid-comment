export default class Node {
  constructor(node) {
    this.$node = document.createElement(node.type);
  }

  append($parent) {
    $parent.appendChild(this.$node)
  }
}
