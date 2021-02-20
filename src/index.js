import { SolidClient } from "./solid/solid-client";
import Home from "./home";

class App {
  constructor() {
    new Home().instantiateComponents();
  }

  async boot() {
    this.solidClient = new SolidClient()
    this.solidClient.login("https://janschill.net")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  async function main() {
    console.log("DOM ready");
    const app = new App();
    app.boot()

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

    // console.log("isLoggedIn", solidClient.isLoggedIn());
  }

  main()
});

export class SolidComment {
  constructor(configuration) {
    this.solidCommentId = configuration.solidCommentId;
    this.serverStorageEndpoint = configuration.serverStorageEndpoint;
    this.webIdsOfAuthors = configuration.webIdsOfAuthors;
  }
}

window.SolidComment = SolidComment;
