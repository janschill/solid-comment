import { SolidClient } from "./solid/solid-client";
import Home from "./home";
import { Comment } from "./models/comment";

export default class App {
  constructor() {
    new Home().instantiateComponents();
  }

  async boot() {
    this.solidClient = new SolidClient();
    await this.solidClient.checkSession();
    Comment.all()
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
