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
    console.log(errorMessage)
    if (errorMessage !== '') {
      this.showElement()
      this.element.innerHTML = errorMessage
    } else {
      this.hideElement()
    }
  }
}
