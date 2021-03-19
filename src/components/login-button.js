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
      store.dispatch('setSession', { state: 'loading', data: store.state.session.data })

      if (solidClient.noActiveSessionInState()) {
        const $solidOidcIssuer = document.querySelector('#solid-oidc-issuer')

        if ($solidOidcIssuer) {
          const solidOidcIssuerUrl = $solidOidcIssuer.value
          if (solidOidcIssuerUrl) {
            await solidClient.login(solidOidcIssuerUrl)
            store.dispatch('setSession', { state: 'idle', data: store.state.session.data })
          }
        }
      } else {
        solidClient.logout()
      }
    }
  }

  render () {
    const sessionState = get(store, 'state.session.state')

    if (sessionState === 'loading') {
      this.element.classList.add('button-disabled')
      this.element.setAttribute('disabled', 'true')
    } else {
      this.element.classList.remove('button-disabled')
      this.element.removeAttribute('disabled')
    }
    const $textElement = this.element.querySelector('.sc-solid-button__text')
    const webId = get(store, 'state.session.data.session.info.webId')
    $textElement.innerText = isUndefined(webId) ? 'Log in' : 'Log out'
  }
}
