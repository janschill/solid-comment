import {
  getSolidDataset,
  getThing,
  getStringNoLocale
} from "@inrupt/solid-client";

import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  fetch
} from "@inrupt/solid-client-authn-browser";

export class SolidClient {
  constructor() {
    this.session = null
  }

  async login(solidOidcIssuer) {
    return await login({
      oidcIssuer: solidOidcIssuer,
      redirectUrl: location.href
    });
  }

  fetch() {
    return fetch()
  }

  isLoggedIn() {
    return getDefaultSession().info.isLoggedIn
  }
}
