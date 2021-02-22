import { SolidClient } from "./solid/solid-client";
import Home from "./home";
import { Comment } from "./models/comment";
import { saveSolidDatasetAt, saveSolidDatasetInContainer } from "@inrupt/solid-client";


export default class App {
  constructor() {
    new Home().instantiateComponents();
  }

  // We still need to click on login after refresh
  async boot() {
    this.solidClient = new SolidClient();
    await this.solidClient.checkSession();
    const comments = await Comment.all();
    const session = await this.solidClient.session();
    console.log(session)
    if (session.info.isLoggedIn) {
      const fetch = this.solidClient.fetch;
      const comment = await comments[0].asRdf();
      const resourceUrl = "https://janschill.net/solid-comment/solid-comment-development";
      console.log("comment", comment);
      await saveSolidDatasetAt(resourceUrl, comment, { fetch: fetch })
    }

    // await this.solidClient.login()
  }
}


// const $solidOidcIssuer = document.querySelector("#solid-oidc-issuer");
  // const $solidLoginButton = document.querySelector("#solid-login-button");
  // if ($solidLoginButton && $solidOidcIssuer) {
  //   $solidLoginButton.addEventListener("click", async () => {
  //     const solidOidcIssuer = $solidOidcIssuer.value;
  //     if (solidOidcIssuer) {
  //       await solidClient.login(solidOidcIssuer)
  //       console.log(solidClient.session)
  //     }
  //   });
  // }
