import Session from './components/session.js';

export default class Home {
  constructor() { }

  instantiateComponents() {
    return {
      session: new Session(),
    }
  }

  render(components) {
    for (const key in components) {
      if (components.hasOwnProperty(key)) {
        components[key].render()
      }
    }
  }

  renderComponents() {
    const components = this.instantiateComponents();
    this.render(components);
  }
}
