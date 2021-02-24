import { Comment } from '../models/comment'
import Component from './component'
import store from '../store/index'

export default class FormSubmit extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-comment-form__submit')
    })
    this.element.onclick = async (event) => {
      event.preventDefault()
      // make sure we get a value here
      // sanitize the value
      const inputValue = store.state.formInput
      const currentUserWebId = store.state.session.session.info.webId
      const session = store.state.session
      if (inputValue && session && session.session.info.isLoggedIn) {
        const currentAgent = store.state.session.agent
        currentAgent.fetchProfile(currentUserWebId).then(() => {
          const comment = new Comment({
            author: currentAgent,
            time: new Date(),
            text: inputValue
          })
          // could be improved with push comment
          const comments = store.state.comments
          comments.push(comment)
          store.dispatch('setComments', comments)
          comment.saveToPod()
          // TODO: add reference to Indico database
        })
      }
    }
  }

  render () {
    if (store.state.formInput === '') {
      this.disableElement()
    } else {
      this.enableElement()
    }
  }
}
