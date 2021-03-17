import { get } from 'lodash'

import Component from './component'
import store from '../store/index'

export default class CommentSection extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-section-form')
    })
  }

  render () {
    const isLoggedIn = get(store, 'state.session.data.session.info.isLoggedIn')

    // TODO: This is for some reason causing issues all of a sudden
    if (isLoggedIn === undefined || !isLoggedIn) {
      this.element.style.display = 'block'
      this.element.innerHTML = '<p>You need to be logged in with your WebID to submit a comment.'
    }
  }
}
