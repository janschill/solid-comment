import Session from '../components/session.js';
import LoginButton from '../components/login-button.js';
import LogoutButton from '../components/logout-button.js';
import Comments from '../components/comments.js';
import Input from '../components/input.js';
import SendButton from '../components/send-button.js';

export default class Home {
  constructor() { }

  instantiateComponents() {
    return {
      session: new Session(),
      loginButton: new LoginButton(),
      logoutButton: new LogoutButton(),
      comments: new Comments(),
      input: new Input(),
      sendButton: new SendButton(),
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
