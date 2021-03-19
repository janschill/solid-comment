import { get, isUndefined } from 'lodash'

import Comment from '../models/comment'
import Component from './component'
import store from '../store/index'

export default class CommentSubmit extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-comment-form__submit')
    })
    this.onlyShowWhenLoggedIn()
    this.element.onclick = async (event) => {
      event.preventDefault()
      const session = get(store, 'state.session.data')

      // TODO: Add frontend hint that not logged in
      if (!isUndefined(session) && session.session.info.isLoggedIn) {
        // sanitize the value
        const inputValue = this.inputValue()
        const currentUserWebId = session.session.info.webId

        if (inputValue.value) {
          const currentAgent = session.agent
          currentAgent.fetchProfile(currentUserWebId).then(() => {
            const comment = new Comment({
              author: currentAgent,
              time: new Date(),
              text: inputValue.value
            })
            this.resetInputField(inputValue.element)
            comment.saveToStore()
            comment.saveToPod()
            // TODO: POST reference to Indico database
            comment.saveToApp()
          })
        }
      }
    }
  }

  render () {
    this.onlyShowWhenLoggedIn()
  }

  resetInputField (element) {
    store.dispatch('setCommentInput', { state: 'idle', data: '' })
    element.value = ''
  }

  inputValue () {
    const inputElement = document.querySelector('#sc-comment-form__input')
    const valueFromStore = store.state.commentInput.data

    return { value: valueFromStore, element: inputElement }
  }
}
