import Component from "../component";
import { SolidClient } from "../solid/solid-client";
import store from "../store/index"

export default class LoginButton extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector("#solid-login-button")
    });
    this.element.onclick = async () => {
      const solidClient = new SolidClient();

      if (store.state.session === "") {
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
    this.element.innerText = store.state.session === "" ? "Log in" : "Log out";
  }
}
