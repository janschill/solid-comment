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
    store.dispatch('setSession', this.session);
    console.log(this.session);

    return this.session;
  }

  async fetcher() {
    const subject = this.store.sym(testUrl + "#this");
    const predicate = this.store.sym('https://example.org/message');
    const object = this.store.literal('hello world');
    const document = subject.doc();
  }


  async load(options, document) {
    try {
      return await this.fetcher.load(document);
    } catch (error) {
      console.error(error);
    }
  }

  async put(data) {
    return await this.load({
      method: 'PUT',
      body: data,
      headers: { "Content-type": 'text/plain' },
    }, '/solid-comment/text.text');
  }

  async post(options) {
    return await this.load(options)
  }

  async get(document) {
    return await this.load({}, document);
  }

  async patch(options) {
    return await this.load(options)
  }

  namespaces() {
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');
    this.EX = $rdf.Namespace('https://example.org/');
    this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
  }

  static document(documentString) {
    return $rdf.sym(documentString);
  }

  static contains() {
    return this.LDP('contains')
  }
}
