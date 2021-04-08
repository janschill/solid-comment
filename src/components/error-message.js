import { get } from 'lodash'

import Component from './component'
import store from '../store/index'

export default class ErrorMessage extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-error')
    })
  }

  render () {
    const errorMessage = get(store, 'state.errorMessage.data')
    if (errorMessage !== '') {
      this.showElement()
      const errorMessagBody = errorMessage.body === ''
        ? ''
        : `<p class="sc-error__body">${errorMessage.body}</p>`

      this.element.innerHTML = `
        <summary class="sc-error__summary">Error: ${errorMessage.summary}</summary>
        ${errorMessagBody}
      `
    } else {
      this.hideElement()
    }
  }
}
