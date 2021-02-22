import Store from '../store/store';

export default class Component {
  constructor(props = {}) {
    const self = this;
    this.render = this.render || function () { };

    if (props.store instanceof Store) {
      props.store.subscribe(() => self.render());
    }

    if (props.hasOwnProperty('element')) {
      this.element = props.element;
    }
  }

  disableElement() {
    this.element.setAttribute("disabled", "true");
  }

  enableElement() {
    this.element.removeAttribute("disabled");
  }
}
