import Comment from '../models/comment'
import Component from './component'
import store from '../store/index'
import { isEmpty } from '../util/object'

export default class CommentSubmit extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-comment-form__submit')
    })
    this.element.onclick = async (event) => {
      event.preventDefault()
      const session = store.state.session.data

      // TODO: Add frontend hint that not logged in
      if (!isEmpty(session)) {
        // sanitize the value
        const inputValue = store.state.commentInput.data
        const currentUserWebId = store.state.session.data.session.info.webId
        if (inputValue && session.session.info.isLoggedIn) {
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
            store.dispatch('setCommentInput', { state: 'idle', data: '' })
            comment.saveToPod()
            // TODO: POST reference to Indico database
          })
        }
      }
    }
  }

  render () {
    if (store.state.commentInput.data === '') {
      this.disableElement()
    } else {
      this.enableElement()
    }
  }
}
