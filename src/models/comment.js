import { SolidModel } from "./solid-model";
import { store } from "../store";
import { config } from "../config";
import { SolidClient } from "../solid/solid-client";
import { toKebabCase } from "../util/formatter";
import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getUrl
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT_EXT } from "@inrupt/vocab-common-rdf";


export class Comment extends SolidModel {

  constructor(comment) {
    super();
    this.author = comment.author
    this.date = comment.date
    this.text = comment.text
  }

  static async all() {
    const client = new SolidClient();
    const commentAuthors = config().webIdsOfAuthors

    commentAuthors.forEach(async webIdUrl => {
      const rootContainerUrl = SolidClient.rootUrl(webIdUrl);
      const appName = toKebabCase(config().appName);
      const resourceUrl = `${rootContainerUrl}/${appName}/${config().solidCommentId}/comments.ttl`
      const dataset = await getSolidDataset(resourceUrl);
      const commentUrl = `${resourceUrl}#uniqueCommentId1`;
      const resource = getThing(dataset, commentUrl);
      const author = getUrl(resource, SCHEMA_INRUPT_EXT.NS("creator"));
      const text = getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS("commentText"));
      const time = getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS("commentTime"));
      console.log(author, text, time)
    });


    // const resourceUrl = `https://janschill.net/solid-comment/${this.solidCommentId}/comments.ttl`;

    // const messageStatements = client.store.match(
    //   null, client.RD('comment'), null, client.commentsResource
    // );

    // let comments = [];
    // messageStatements.forEach(statement => {
    //   const value = statement.object.value;
    //   comments.push(new Comment({ message: value, rdfNode: statement }));
    // });

    // store.dispatch('setComments', comments);

    // return comments;
  }
}
