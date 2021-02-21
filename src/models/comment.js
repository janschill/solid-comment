import { SolidModel } from "./solid-model";
import store from "../store";
import { config } from "../config";
import { SolidClient } from "../solid/solid-client";
import { toKebabCase } from "../util/formatter";
import {
  getContainedResourceUrlAll,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
  getUrlAll
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
    // const comments = [];

    async function getComments () {
      const comments = [];
      const rootContainerUrl = SolidClient.rootUrl(commentAuthors[0]);
      // const rootContainerUrl = SolidClient.rootUrl(webIdUrl);
      const appName = toKebabCase(config().appName);
      const containerUrl = `${rootContainerUrl}/${appName}/${config().solidCommentId}/`;
      const containerDataset = await getSolidDataset(containerUrl);
      const containerResourceUrls = getContainedResourceUrlAll(containerDataset);

      for await (const reourceDataset of containerResourceUrls.forEach(async resourceUrl => {
        return await getSolidDataset(resourceUrl);
      })) {
        const resource = getThing(reourceDataset, `${resourceUrl}#it`);
        comments.push(new Comment({
          author: getUrl(resource, SCHEMA_INRUPT_EXT.NS("creator")),
          text: getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS("commentText")),
          time: getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS("commentTime")),
        }));
      }
      return comments;
    }
    const comments = await getComments();

    // commentAuthors.forEach(async webIdUrl => {
    //   const rootContainerUrl = SolidClient.rootUrl(webIdUrl);
    //   const appName = toKebabCase(config().appName);
    //   const containerUrl = `${rootContainerUrl}/${appName}/${config().solidCommentId}/`;
    //   const containerDataset = await getSolidDataset(containerUrl);
    //   const containerResourceUrls = getContainedResourceUrlAll(containerDataset);

    //   containerResourceUrls.forEach(async resourceUrl => {
    //     const reourceDataset = await getSolidDataset(resourceUrl);
    //     const resource = getThing(reourceDataset, `${resourceUrl}#it`);
    //     comments.push(new Comment({
    //       author: getUrl(resource, SCHEMA_INRUPT_EXT.NS("creator")),
    //       text: getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS("commentText")),
    //       time: getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS("commentTime")),
    //     }));
    //     console.log(resource)


    //   });
      // const resources = getUrlAll(dataset, SCHEMA_INRUPT_EXT.NS("UserComments"))

      console.log(comments)
      console.log(containerResourceUrls)

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
