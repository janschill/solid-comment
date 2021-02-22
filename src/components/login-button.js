import Component from "./component";
import { SolidClient } from "../solid/solid-client";
import store from "../store/index"

export default class LoginButton extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector("#sc-solid-button-login")
    });
    this.element.onclick = async () => {
      const solidClient = new SolidClient();

      if (store.state.webId === "") {
        const $solidOidcIssuer = document.querySelector("#solid-oidc-issuer");

        if ($solidOidcIssuer) {
          const solidOidcIssuerUrl = $solidOidcIssuer.value;
          if (solidOidcIssuerUrl) {
            await solidClient.login(solidOidcIssuerUrl)
          }
        }
      } else {
        solidClient.logout();
      }
    };
  }

  render() {
    const $textElement = this.element.querySelector(".sc-solid-button__text")
    $textElement.innerText = store.state.webId === "" ? "Log in" : "Log out";
  }
}
