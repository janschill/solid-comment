import store from "../store"
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  fetch
} from "@inrupt/solid-client-authn-browser";

export class SolidClient {
  constructor() { }

  async login(solidOidcIssuer) {
    await handleIncomingRedirect();

    if (!getDefaultSession().info.isLoggedIn) {
      await login({
        oidcIssuer: solidOidcIssuer,
        redirectUrl: window.location.href
      });
    }

    store.dispatch("setSession", getDefaultSession().info.webId);
  }

  async fetch() {
    return await fetch();
  }

  isLoggedIn() {
    return getDefaultSession().info.isLoggedIn
  }
}
