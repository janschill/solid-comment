import store from '../store/index.js';
import SolidClient from '../solid-client.js';

export default class Comment {
  constructor(params) {
    this.message = params.message;
    this.rdfNode = params.rdfNode;
    if (this.rdfNode === null) {
      this.rdfNode = this.generateRDF()
    }

    // this.createdAt = new Date().now();
  }

  generateRDF() {
    return `${this.message} in RDF`
  }

  value() {
    return this.message;
  }

  static asRDF(comments) {
    console.log('asRDF', comments)
    return comments;
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
