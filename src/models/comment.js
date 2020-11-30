import store from '../store/index.js';
import SolidClient from '../solid-client.js';

export default class Comment {
  constructor(params) {
    this.rdfNode = params.rdfNode;
    this.message = params.message;
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
      `${solidClient.origin}/solid-comment/comments.ttl`
    );
    await solidClient.get(solidCommentContainer); // maps the store

    const messageStatements = solidClient.store.match(
      null, solidClient.RD('comment'), null, solidCommentContainer
    );

    let comments = [];
    messageStatements.forEach(statement => {
      const value = statement.object.value;
      comments.push(new Comment({ message: value, rdfNode: statement }));
    });

    store.dispatch('setComments', comments);

    return comments;
  }
}
