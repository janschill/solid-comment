import {
  login,
  handleIncomingRedirect,
  getDefaultSession
} from '@inrupt/solid-client-authn-browser'

import { config } from '../config'
import store from '../store'
import Session from './session'
import SolidAgent from '../models/solid-agent'
import { hasHttps, originFromUrl } from '../util/url'
import TrustedAppAclManager from './trusted-app-acl-manager'

export default class SolidClient {
  async login (solidOidcIssuer = '') {
    try {
      await handleIncomingRedirect({ restorePreviousSession: true })

      if (!getDefaultSession().info.isLoggedIn) {
        await login({
          oidcIssuer: solidOidcIssuer,
          redirectUrl: window.location.href
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async checkSession () {
    store.dispatch('setSession', { state: 'loading', data: store.state.session.data })
    await handleIncomingRedirect({ restorePreviousSession: true })
    const session = await getDefaultSession()

    if (session.info.isLoggedIn) {
      const trustedAppAclManager = new TrustedAppAclManager(
        { agentWebId: session.info.webId, appUrl: config().appUrl }
      )
      const hasControlAccess = await trustedAppAclManager.hasControlAccess()
      if (hasControlAccess) {
        const solidAgent = new SolidAgent()
        await solidAgent.fetchProfile(session.info.webId)
        store.dispatch('setSession', {
          state: 'idle',
          data: new Session({
            session: session,
            agent: solidAgent
          })
        })
      } else {
        store.dispatch('setErrorMessage', {
          state: 'idle',
          data: {
            summary: 'Application does not have control access.',
            body: `
            <p>The application needs to have control access in order to write files/comments into your data pod.</p>
            <p>How to fix:</p>
            <ol class="sc-ol">
              <li class="sc-li">Log in to your Pod</li>
              <li class="sc-li">Go to “Preferences”</li>
              <li class="sc-li">Under “Manage your trusted applications,” look for ${originFromUrl(config().appUrl)} and check the “Control” box</li>
              <li class="sc-li">Click on “Update”</li>
              <li class="sc-li">Return here and refresh your browser</li>
            </ol>
            `
          }
        })
        this.logout()
      }
    }
    store.dispatch('setSession', { state: 'idle', data: store.state.session.data })
  }

  noActiveSessionInState () {
    const session = store.state.session.data

    return session &&
      Object.keys(session).length === 0 &&
      session.constructor === Object
  }

  async logout () {
    try {
      await getDefaultSession().logout()
      store.dispatch('setSession', { state: 'idle', data: {} })
    } catch (e) {
      console.error(e)
    }
  }

  async session () {
    const session = await getDefaultSession()

    return session
  }

  static validIdentityProvider (urlString = '') {
    if (urlString === '') {
      return false
    }

    if (!hasHttps(urlString)) {
      return false
    }

    return true
  }
}
