import store from "../store"
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  fetch
} from "@inrupt/solid-client-authn-browser";

export class SolidClient {
  constructor() { }

  async login(solidOidcIssuer = "") {
    try {
      if (solidOidcIssuer === "") {
        const $solidOidcIssuer = document.querySelector("#solid-oidc-issuer");
        solidOidcIssuer = $solidOidcIssuer.value
      }
      await handleIncomingRedirect();

      if (!getDefaultSession().info.isLoggedIn) {
        await login({
          oidcIssuer: solidOidcIssuer,
          redirectUrl: window.location.href
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async checkSession() {
    await handleIncomingRedirect();
    const session = await getDefaultSession();

    if (session.info.isLoggedIn) {
      store.dispatch("setWebId", session.info.webId);
    }
  }

  async fetch() {
    return await fetch();
  }

  async logout() {
    try {
      await getDefaultSession().logout();
      store.dispatch("setWebId", "");
    } catch (e) {
      console.error(e);
    }
  }

  async currentUser() {
    const session = await getDefaultSession();
    return session.info.webId;
  }

  static rootUrl(url) {
    return new URL(url).origin;
  }
}
