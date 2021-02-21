import { SolidModel } from "./solid-model";
import store from "../store";
import { config } from "../config";
import { SolidClient } from "../solid/solid-client";
import { toKebabCase } from "../util/formatter";
import {
  getContainedResourceUrlAll,
  getSolidDataset,
  getStringNoLocale,
  getThingAll,
  getUrl,
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
    // const client = new SolidClient();
    const commentAuthors = config().webIdsOfAuthors
    const comments = [];

    for (const webIdUrl of commentAuthors) {
      const rootContainerUrl = SolidClient.rootUrl(webIdUrl);
      const appName = toKebabCase(config().appName);
      const containerUrl = `${rootContainerUrl}/${appName}/${config().solidCommentId}/`;
      const containerDataset = await getSolidDataset(containerUrl);
      const containerResourceUrls = getContainedResourceUrlAll(containerDataset);

      for (const resourceUrl of containerResourceUrls) {
        const resourceDataset = await getSolidDataset(resourceUrl);
        const resources = getThingAll(resourceDataset);
        resources.forEach(resource => {
          comments.push(new Comment({
            author: getUrl(resource, SCHEMA_INRUPT_EXT.NS("creator")),
            text: getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS("commentText")),
            time: getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS("commentTime")),
          }));
        });
      }
    }

    store.dispatch('setComments', comments);

    return comments;
  }
}
