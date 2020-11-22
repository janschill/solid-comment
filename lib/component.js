import Store from '../src/store/store.js';

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
}
