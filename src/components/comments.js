import Component from './component'
import store from '../store'
import Time from '../util/time'

export default class Comments extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-list')
    })
  }

  async render () {
    let html = ''
    store.state.comments.sort((a, b) => b.time - a.time).forEach(comment => {
      html += `
      <li class="sc-list__item">
        <article class="sc-list__article">
          <aside class="sc-list__aside">
            <a href="${comment.author.webIdUrl}" target="_blank">
              <img class="sc-list__image" src="${comment.author.photo}" alt="${comment.author.fullName}">
            </a>
          </aside>
          <section class="">
            <header class="sc-list__header">
              <address class="sc-list__author"><a href="${comment.author.webIdUrl}" target="_blank">${comment.author.fullName}</a></address> ·
              <abbr class="sc-list__date" title="${comment.time}">${Time.format('M d', comment.time)}</abbr>
            </header>
            <p class="sc-list__text">${comment.text}</p>
          </section>
        </article>
      </li>
      `
    })

    this.element.innerHTML = html
  }
}
