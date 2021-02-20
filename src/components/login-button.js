import Component from "../component";
import store from "../store/index"

export default class LoginButton extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector("#solid-login-button")
    });
    this.element.addEventListener("click", async () => {
      if (store.state.session === "") {
        const $solidOidcIssuer = document.querySelector("#solid-oidc-issuer");

        if ($solidOidcIssuer) {
          const solidOidcIssuer = $solidOidcIssuer.value;
          if (solidOidcIssuer) {
            await solidClient.login(solidOidcIssuer)
          }
        }
      } else {
        console.log("Log me out")
      }
    });
  }

  render() {
    const buttonLabel = store.state.session === "" ? "Log in" : "Log out"
    this.element.innerText = buttonLabel;
  }
}
