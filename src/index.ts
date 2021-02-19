import { SolidClient } from "./solid/solid-client";

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM ready');

  async function main() {
    const solidClient: SolidClient = new SolidClient();

    const $solidOidcIssuer: HTMLInputElement | null = document.querySelector("#solid-oidc-issuer");
    const $solidLoginButton: HTMLButtonElement | null = document.querySelector("#solid-login-button");
    if ($solidLoginButton && $solidOidcIssuer) {
      $solidLoginButton.addEventListener("click", async () => {
        const solidOidcIssuer: string = $solidOidcIssuer.value;
        await solidClient.login(solidOidcIssuer)
        console.log(solidClient.session)
      });
    }
  }

  main()
});
