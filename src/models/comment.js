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
    await solidClient.login();
    const document = SolidClient.document(`${solidClient.origin}/solid-comment/`);
    console.log('document', document);
    // const session = await solidClient.session();
    await solidClient.get(document);
    let comments = await solidClient.store.any(document, solidClient.LDP('contains'));
    console.log(comments);

    console.log(solidClient.store)

    comments.forEach(file => {
      console.log(' contains ' + file);
    });

    throw 'lets look at the response';
    store.dispatch('setComments', await commentFileValue.text());

    return store.state.comments
  }
}
