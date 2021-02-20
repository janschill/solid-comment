import { SolidClient } from "./solid/solid-client";
import Home from "./home";

export default class App {
  constructor() {
    new Home().instantiateComponents();
  }

  async boot() {
    this.solidClient = new SolidClient();
    // this.solidClient.fetch()
    // await this.solidClient.checkSession();
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
