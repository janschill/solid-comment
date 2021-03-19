import { get, isUndefined } from 'lodash'

import Store from '../store/store'
import store from '../store/'

export default class Component {
  constructor (props = {}) {
    const self = this
    this.render = this.render || function () { }

    if (props.store instanceof Store) {
      props.store.subscribe(() => self.render())
    }

    if (Object.prototype.hasOwnProperty.call(props, 'element')) {
      this.element = props.element
    }
  }

  onlyShowWhenLoggedIn () {
    const isLoggedIn = get(store, 'state.session.data.session.info.isLoggedIn')

    if (isUndefined(isLoggedIn) || !isLoggedIn) {
      this.hideElement()
    } else {
      this.showElement()
    }
  }

  onlyShowWhenLoggedOut () {
    const isLoggedIn = get(store, 'state.session.data.session.info.isLoggedIn')

    if (isUndefined(isLoggedIn) || !isLoggedIn) {
      this.showElement()
    } else {
      this.hideElement()
    }
  }

  disableElement () {
    this.element.setAttribute('disabled', 'true')
  }

  enableElement () {
    this.element.removeAttribute('disabled')
  }

  hideElement () {
    this.element.classList.add('hidden')
  }

  showElement () {
    this.element.classList.remove('hidden')
  }
}
