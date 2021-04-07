import Time from '../../util/time'
import { sanitizeHtml } from '../../util/html'

export function commentTemplate (comment) {
  return `
  <li class="sc-list__item">
    <article class="sc-comment" data-resource-url="${comment.resourceUrl}">
      <aside class="sc-comment__aside">
        <a href="${comment.author.webIdUrl}" target="_blank">
          <img class="sc-comment__image" src="${comment.author.photo}" alt="${comment.author.fullName}">
        </a>
      </aside>
      <section>
        <header class="sc-comment__header">
          <address class="sc-comment__author"><a href="${comment.author.webIdUrl}" target="_blank">${comment.author.fullName}</a></address> ·
          <abbr class="sc-comment__date" title="${comment.time}">${Time.format('M d', comment.time)}</abbr>
          <div class="sc-comment__menu">
            <button class="sc-comment__menu-toggle">
              <span class="sc-meatballs-menu">
                <span class="sc-circle"></span><span class="sc-circle"></span><span class="sc-circle"></span>
              </span>
            </button>
            <ul class="sc-comment__menu-action-list">
              <li class="sc-comment__menu-action-list-item"><button class="sc-comment__menu-action-button" data-action="delete">Delete</button></li>
            </ul>
          </div>
        </header>
        <p class="sc-comment__text">${sanitizeHtml(comment.text)}</p>
      </section>
    </article>
  </li>
  `
}
