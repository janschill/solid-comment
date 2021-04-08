import isUndefined from 'lodash.isundefined'

import Component from './component'
import SolidClient from '../auth/solid-client'
import store from '../store/index'
import get from 'lodash.get'
import { setHttps } from '../util/url'

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
          const solidOidcIssuerUrl = setHttps($solidOidcIssuer.value)

          if (SolidClient.validIdentityProvider(solidOidcIssuerUrl)) {
            await solidClient.login(solidOidcIssuerUrl)
          } else {
            store.dispatch('setErrorMessage', {
              state: 'idle',
              data: {
                summary: 'Invalid identity provider URL',
                body: 'You have provided an invalid identity provider URL. Make sure the URL provided points to your IDP.'
              }
            })
          }
        }
      } else {
        solidClient.logout()
      }
      store.dispatch('setSession', { state: 'idle', data: store.state.session.data })
    }
  }

  render () {
    const sessionState = get(store, 'state.session.state')

    if (sessionState === 'loading') {
      this.element.classList.add('sc-button-disabled')
      this.element.setAttribute('disabled', 'true')
    } else {
      this.element.classList.remove('sc-button-disabled')
      this.element.removeAttribute('disabled')
    }
    const $textElement = this.element.querySelector('.sc-solid-button__text')
    const webId = get(store, 'state.session.data.session.info.webId')
    $textElement.innerText = isUndefined(webId) ? 'Log in' : 'Log out'
  }
}
