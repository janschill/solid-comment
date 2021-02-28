import Component from './component'
import store from '../store/index'

export default class LoginInput extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-header__oidc-input')
    })
  }

  render () {
    this.onlyShowWhenLoggedOut()
  }
}
