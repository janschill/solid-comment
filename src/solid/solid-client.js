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
    try {
      await handleIncomingRedirect();

      if (!getDefaultSession().info.isLoggedIn) {
        console.log("logging in?")
        await login({
          oidcIssuer: solidOidcIssuer,
          redirectUrl: window.location.href
        });
      }

      store.dispatch("setSession", getDefaultSession().info.webId);
    } catch (e) {
      console.error(e);
    }
  }

  async checkSession() {
    const session = await getDefaultSession();
    console.log(session)
    // await handleIncomingRedirect();

    if (getDefaultSession().info.isLoggedIn) {
      store.dispatch("setSession", getDefaultSession().info.webId);
    }
  }

  async fetch() {
    return await fetch();
  }

  async logout() {
    try {
      await getDefaultSession().logout();
      store.dispatch("setSession", "");
    } catch (e) {
      console.error(e);
    }
  }
}
