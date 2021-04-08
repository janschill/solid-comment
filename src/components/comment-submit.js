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
    this.onlyShowWhenLoggedInAndAuthorized()
    this.element.onclick = async (event) => {
      event.preventDefault()
      const session = get(store, 'state.session.data')

      if (!isUndefined(session) && session.session.info.isLoggedIn) {
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
            comment.saveToApp()
          })
        }
      }
    }
  }

  render () {
    this.onlyShowWhenLoggedInAndAuthorized()
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
