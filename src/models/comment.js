import store from '../store/index.js';
import SolidClient from '../solid-client.js';

export default class Comment {
  constructor(rdfNode, message) {
    this.rdfNode = rdfNode;
    this.message = message;
    // this.createdAt = new Date().now();
  }

  value() {
    return this.message;
  }

  asRDF() {
    return this.rdfNode;
  }

  static async all() {
    const solidClient = new SolidClient();
    await solidClient.login();
    const solidCommentContainer = SolidClient.document(
      `${solidClient.origin}/solid-comment/`
    );
    await solidClient.get(solidCommentContainer);
    let resourcesInContainer = solidClient.store.match(
      solidCommentContainer, solidClient.LDP('contains')
    );
    console.log(solidClient.store)
    console.log(resourcesInContainer)
    let commentResources = []
    let comments = []
    resourcesInContainer.forEach(file => {
      const commentNode = file.object;
      let message = solidClient.store.any(
        solidClient.store.sym(`${commentNode}`),
        'https://example.org/message',
        null,
        null,
      )
      if (message === null) {
        message = 'Test'
      }
      comments.push(new Comment(commentNode, message));
      commentResources.push(commentNode);
    });

    console.log(comments);

    store.dispatch('setComments', comments);

    return commentResources;
  }
}
