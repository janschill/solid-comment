import { get, isUndefined } from 'lodash'

import Store from '../store/store'
import store from '../store/'
import { config } from '../config'

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

  isLoggedIn () {
    const isLoggedIn = get(store, 'state.session.data.session.info.isLoggedIn')
    return !isUndefined(isLoggedIn) && isLoggedIn
  }

  isAuthorized () {
    return true
  }

  isLoggedInWithExternalApp () {
    return config().hasAuthenticatedAppSession
  }

  onlyShowWhenLoggedInAndAuthorized () {
    this.isLoggedIn() && this.isAuthorized()
      ? this.showElement()
      : this.hideElement()
  }

  onlyShowWhenLoggedIn () {
    this.isLoggedIn() ? this.showElement() : this.hideElement()
  }

  onlyShowWhenLoggedOut () {
    this.isLoggedIn() ? this.hideElement() : this.showElement()
  }

  disableElement () {
    this.element.setAttribute('disabled', 'true')
  }

  enableElement () {
    this.element.removeAttribute('disabled')
  }

  hideElement () {
    this.element.classList.add('sc-hidden')
  }

  showElement () {
    this.element.classList.remove('sc-hidden')
  }
}
