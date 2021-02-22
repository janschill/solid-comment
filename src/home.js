import WebId from "./components/webid";

export default class Home {
  constructor() { }

  instantiateComponents() {
    return {
      comments: new Comments(),
      loginButton: new LoginButton(),
      webid: new WebId(),
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
