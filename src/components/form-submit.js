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
      const inputValue = store.state.formInput.data
      const currentUserWebId = store.state.session.data.session.info.webId
      const session = store.state.session.data
      if (inputValue && session && session.session.info.isLoggedIn) {
        const currentAgent = store.state.session.data.agent
        currentAgent.fetchProfile(currentUserWebId).then(() => {
          const comment = new Comment({
            author: currentAgent,
            time: new Date(),
            text: inputValue
          })
          // could be improved with push comment
          const comments = store.state.comments.data
          comments.push(comment)
          store.dispatch('setComments', { state: 'idle', data: comments })
          store.dispatch('setFormInput', { state: 'idle', data: '' })
          comment.saveToPod() // async, but don't have to wait
          // TODO: add reference to Indico database
        })
      }
    }
  }

  render () {
    if (store.state.formInput.data === '') {
      this.disableElement()
    } else {
      this.enableElement()
    }
  }
}
