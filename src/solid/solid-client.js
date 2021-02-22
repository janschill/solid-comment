import store from "../store"
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  fetch
} from "@inrupt/solid-client-authn-browser";
import Session from "../models/session";
import SolidAgent from "../models/solid-agent";

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
      const solidAgent = new SolidAgent()
      await solidAgent.fetchProfile(session.info.webId);
      store.dispatch("setSession", new Session({
        session: session,
        agent: solidAgent,
      }));
      store.dispatch("setWebId", session.info.webId);
    }
  }

  fetch() {
    return fetch;
  }

  async logout() {
    try {
      await getDefaultSession().logout();
      store.dispatch("setWebId", "");
      store.dispatch("setSession", {});
    } catch (e) {
      console.error(e);
    }
  }

  async session() {
    const session = await getDefaultSession();

    return session;
  }

  async currentUserWebId() {
    const session = await getDefaultSession();
    return session.info.webId;
  }

  static rootUrl(url) {
    return new URL(url).origin;
  }
}
