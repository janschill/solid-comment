import Comments from './components/comments';
import LoginButton from './components/login-button';
import Session from './components/session';

export default class Home {
  constructor() { }

  instantiateComponents() {
    return {
      comments: new Comments(),
      loginButton: new LoginButton(),
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
