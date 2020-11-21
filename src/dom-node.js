export default class DOMNode {
  constructor(node) {
    this.$node = document.createElement(node.type);
    if (node.innerHTML != '') {
      this.$node.innerHTML = node.innerHTML;
    }
    if (node.classList.length > 0) {
      this.addClasses(node.classList);
    }
  }

  append($parent) {
    $parent.appendChild(this.$node)
  }

  addClasses(classList) {
    classList.forEach(className => {
      this.$node.classList.add(className);
    });
  }
}
