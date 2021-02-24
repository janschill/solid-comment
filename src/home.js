import Comments from './components/comments'
import CommentInput from './components/comment-input'
import CommentSubmit from './components/comment-submit'
import LoginButton from './components/login-button'
import WebId from './components/webid'

export default class Home {
  instantiateComponents () {
    return {
      comments: new Comments(),
      commentInput: new CommentInput(),
      formSubmit: new CommentSubmit(),
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
