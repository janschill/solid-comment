import FormInput from "./components/form-input";
import WebId from "./components/webid";

export default class Home {
  constructor() { }

  instantiateComponents() {
    return {
      comments: new Comments(),
      formInput: new FormInput(),
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
