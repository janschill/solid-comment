import store from '../store/index.js';
import SolidClient from '../solid-client.js';

export default class Comment {
  constructor(description) {
    this.description = description;
    this.createdAt = new Date.now();
  }

  asRDF() {

  }

  static async all() {
    const solidClient = new SolidClient();
    // const session = await solidClient.session();
    const response = await solidClient.get();
    console.log(solidClient.store)
    console.log(response)
    console.log(response.responseText)
    throw 'lets look at the response';
    store.dispatch('setComments', await commentFileValue.text());

    return store.state.comments
  }
}
