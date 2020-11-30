import { currentSession, fetch } from 'solid-auth-client';
import store from './store/index.js';
const $rdf = require('rdflib')

export default class SolidClient {
  constructor() {
    this.namespaces();
    this.applicationSlug = '/solid-comment/'
    this.store = $rdf.graph();
    this.fetcher = new $rdf.Fetcher(this.store, {
      fetch: async (url, options) => {
        return await fetch(url, options)
      }
    });
  }

  async login() {
    this.session = await currentSession();
    this.webIdUrl = this.session.webId;
    this.origin = new URL(this.session.webId).origin;
    this.commentsResource = SolidClient.document(
      `${this.origin}/solid-comment/comments.ttl`
    );
    store.dispatch('setSession', this.session);
    console.log(this.session);

    return this.session;
  }

  // async fetcher() {
  //   const subject = this.store.sym(testUrl + "#this");
  //   const predicate = this.store.sym('https://example.org/message');
  //   const object = this.store.literal('hello world');
  //   cosnst document = subject.doc();
  // }


  async load(options) {
    try {
      return await this.fetcher.load(this.commentsResource);
    } catch (error) {
      console.error(error);
    }
  }

  async put(document) {
    return await this.fetcher.putBack(document);
  }

  async post(options) {
    return await this.load(options)
  }

  async get() {
    return await this.load({});
  }

  async patch(options) {
    return await this.load(options)
  }

  namespaces() {
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');
    this.EX = $rdf.Namespace('https://example.org/');
    this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    this.SCHEM = $rdf.Namespace('http://purl.org/vocab/lifecycle/schema#');
    this.RD = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
  }

  static document(documentString) {
    return $rdf.sym(documentString);
  }

  static contains() {
    return this.LDP('contains')
  }
}
