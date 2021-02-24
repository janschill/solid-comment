import Comments from './components/comments'
import FormInput from './components/form-input'
import FormSubmit from './components/form-submit'
import LoginButton from './components/login-button'
import WebId from './components/webid'

export default class Home {
  instantiateComponents () {
    return {
      comments: new Comments(),
      formInput: new FormInput(),
      formSubmit: new FormSubmit(),
      loginButton: new LoginButton(),
      webid: new WebId()
    }
  }

  render (components) {
    for (const key in components) {
      if (Object.prototype.hasOwnProperty.call(components, key)) {
        components[key].render()
      }
    }
  }

  renderComponents () {
    const components = this.instantiateComponents()
    this.render(components)
  }
}
