import {
  login,
  handleIncomingRedirect,
  getDefaultSession
} from '@inrupt/solid-client-authn-browser'

import { config } from '../config'
import store from '../store'
import Session from './session'
import SolidAgent from '../models/solid-agent'
import { hasHttps } from '../util/url'
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
      if (trustedAppAclManager.hasControlAccess()) {
        const solidAgent = new SolidAgent()
        await solidAgent.fetchProfile(session.info.webId)
        store.dispatch('setSession', {
          state: 'idle',
          data: new Session({
            session: session,
            agent: solidAgent
          })
        })
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
