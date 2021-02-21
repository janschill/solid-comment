import Component from "../component";
import store from "../store";

export default class Comments extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".solid-comment-list")
    });
  }

  async render() {
    let html = "";

    store.state.comments.forEach(comment => {
      html += `
      <li class="sc-list__item">
        <article class="sc-list__article"
          <header class="sc-list__header">
            <abbr class="sc-list__date" title="${comment.time}">${comment.time}</abbr>
            <address class="sc-list__author">${comment.author}</address>
          </header>
          <p class="sc-list__text">${comment.text}</p>
        </article>
      </li>
      `
    });

    this.element.innerHTML = html;
  }
}
