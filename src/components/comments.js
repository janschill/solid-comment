import Component from "./component";
import store from "../store";
import Time from "../util/time";

export default class Comments extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".sc-list")
    });
  }

  async render() {
    let html = "";

    store.state.comments.forEach(comment => {
      html += `
      <li class="sc-list__item">
        <article class="sc-list__article">
          <header class="sc-list__header">
            <abbr class="sc-list__date" title="${comment.time}">${Time.format("M d", comment.time)}</abbr>
            <address class="sc-list__author"><abbr title="${comment.author.fullName}">${comment.author.initials()}</abbr></address>
          </header>
          <p class="sc-list__text">${comment.text}</p>
        </article>
      </li>
      `
    });

    this.element.innerHTML = html;
  }
}
