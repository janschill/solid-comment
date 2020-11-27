import { currentSession, fetch } from 'solid-auth-client';
import store from './store/index.js';
const $rdf = require('rdflib')

export default class SolidClient {
  constructor() {
    this.applicationSlug = '/solid-comment/'
    this.store = $rdf.graph();
    this.fetcher = new $rdf.Fetcher(this.store, {
      fetch: async (url, options) => {
        return await fetch(url, options)
      }
    });
  }

  async session() {
    this.session = await currentSession();
    store.dispatch('setSession', this.session);

    return this.session;
  }

  async fetcher() {
    const subject = this.store.sym(testUrl + "#this");
    const predicate = this.store.sym('https://example.org/message');
    const object = this.store.literal('hello world');
    const document = subject.doc();
  }


  async load(options, pathname_ = '') {
    const session = await this.session();
    let pathname = pathname_;
    if (pathname_ === '') {
      pathname = this.applicationSlug
    }

    try {
      // This assumes that the data pod and WebID URL are on the same URI
      this.webIdUrl = new URL(session.webId).origin;
      const document = $rdf.sym(`${this.webIdUrl}${pathname}`);

      return await this.fetcher.load(document);
      // return await fetch(requestURL, options);
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

  async get(pathname = '') {
    console.log('GET: ', pathname)
    return await this.load({}, pathname);
  }

  async patch(options) {
    return await this.load(options)
  }
}
