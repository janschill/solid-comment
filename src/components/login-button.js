import Component from './component'
import SolidClient from '../auth/solid-client'
import store from '../store/index'
import get from 'lodash.get'
import isUndefined from 'lodash.isundefined'

export default class LoginButton extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#sc-solid-button-login')
    })
    this.element.onclick = async () => {
      const solidClient = new SolidClient()

      if (solidClient.noActiveSessionInState()) {
        const $solidOidcIssuer = document.querySelector('#solid-oidc-issuer')

        if ($solidOidcIssuer) {
          const solidOidcIssuerUrl = $solidOidcIssuer.value
          if (solidOidcIssuerUrl) {
            await solidClient.login(solidOidcIssuerUrl)
          }
        }
      } else {
        solidClient.logout()
      }
    }
  }

  render () {
    const $textElement = this.element.querySelector('.sc-solid-button__text')
    const webId = get(store, 'state.session.data.session.info.webId')
    $textElement.innerText = isUndefined(webId) ? 'Log in' : 'Log out'
  }
}
