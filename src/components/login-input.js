import Component from './component'
import store from '../store/index'
import { get } from 'lodash'

export default class LoginInput extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-header__oidc-input')
    })
  }

  render () {
    const isLoggedIn = get(store, 'state.session.data.session.info.isLoggedIn')

    if (isLoggedIn === undefined || !isLoggedIn) {
      this.element.classList.remove('sc-header__oidc-input--hidden')
    } else {
      this.element.classList.add('sc-header__oidc-input--hidden')
    }
  }
}
