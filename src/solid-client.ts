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

import { VCARD } from "@inrupt/vocab-common-rdf";

export class SolidClient {
  session: Promise<void> | null

  constructor() {
    this.session = null
  }

  async login(solidOidcIssuer: string) {
    return await login({
      oidcIssuer: solidOidcIssuer,
      redirectUrl: location.href
    });
  }
}