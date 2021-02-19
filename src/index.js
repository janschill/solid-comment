import { SolidClient } from "./solid/solid-client";

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
