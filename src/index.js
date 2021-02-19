import { Comment } from "./models/comment";
import { SolidClient } from "./solid/solid-client";
import {
  getSolidDataset,
  getThing,
  getStringNoLocale
} from "@inrupt/solid-client";
import { VCARD } from "@inrupt/vocab-common-rdf";

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM ready');

  async function main() {
    const solidClient = new SolidClient();

    const $solidOidcIssuer = document.querySelector("#solid-oidc-issuer");
    const $solidLoginButton = document.querySelector("#solid-login-button");
    if ($solidLoginButton && $solidOidcIssuer) {
      $solidLoginButton.addEventListener("click", async () => {
        const solidOidcIssuer = $solidOidcIssuer.value;
        await solidClient.login(solidOidcIssuer)
        console.log(solidClient.session)
      });
    }
  }

  main()
});

export class SolidComment {
  constructor(configuration) {
    this.solidCommentId = configuration.solidCommentId;
    this.serverStorageEndpoint = configuration.serverStorageEndpoint;
    this.webIdsOfAuthors = configuration.webIdsOfAuthors;

    this.main();
  }

  async readComments() {
    const resourceUrl = `https://janschill.net/solid-comment/${this.solidCommentId}/example.ttl`;
    const dataset = await getSolidDataset(resourceUrl);
    const resource = getThing(dataset, resourceUrl);
    // const fn = getStringNoLocale(profile, VCARD.fn);
    // const role = getStringNoLocale(profile, VCARD.role);
    return resource
  }

  async main() {
    const comments = await this.readComments()
    console.log(comments)


    // new Comment({
    //   author: "https://janschill.net/profile/card#me",
    //   text: "My first comment",
    //   date: new Date()
    // })
    // fetch comments
    // render elements
    //
  }
}

window.SolidComment = SolidComment;
