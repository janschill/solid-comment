import Comments from './components/comments'
import CommentInput from './components/comment-input'
import CommentSection from './components/comment-section'
import CommentSubmit from './components/comment-submit'
import ErrorMessage from './components/error-message'
import LoginButton from './components/login-button'
import LoginInput from './components/login-input'

export default class Home {
  instantiateComponents () {
    return {
      comments: new Comments(),
      commentInput: new CommentInput(),
      commentSection: new CommentSection(),
      commentSubmit: new CommentSubmit(),
      errorMessage: new ErrorMessage(),
      loginButton: new LoginButton(),
      loginInput: new LoginInput()
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
