import { isEmpty } from 'lodash'

import Component from './component'
import store from '../store'
import Time from '../util/time'

export default class Comments extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-section-comments')
    })
  }

  async render () {
    const state = store.state.comments.state
    let html = ''

    if (state === 'loading') {
      html = '<div class="lds-dual-ring"></div>'
    } else {
      const comments = store.state.comments.data

      if (comments.length > 0) {
        html = '<ul class="sc-list">'
        comments.sort((a, b) => b.time - a.time).forEach(comment => {
          html += `
          ${isEmpty(comment) ? this.htmlCommentUnavailable() : this.htmlComment(comment)}
          `
        })
        html += '</ul>'
      } else {
        html = '<p>There seem to be no comments</p>'
      }
    }

    this.element.innerHTML = html
  }

  htmlComment (comment) {
    return `
    <li class="sc-list__item">
      <article class="sc-list__article">
        <aside class="sc-list__aside">
          <a href="${comment.author.webIdUrl}" target="_blank">
            <img class="sc-list__image" src="${comment.author.photo}" alt="${comment.author.fullName}">
          </a>
        </aside>
        <section>
          <header class="sc-list__header">
            <address class="sc-list__author"><a href="${comment.author.webIdUrl}" target="_blank">${comment.author.fullName}</a></address> ·
            <abbr class="sc-list__date" title="${comment.time}">${Time.format('M d', comment.time)}</abbr>
          </header>
          <p class="sc-list__text">${comment.text}</p>
        </section>
      </article>
    </li>
    `
  }

  htmlCommentUnavailable () {
    return `
    <li class="sc-list__item sc-list__item--unavailable">
      <article class="sc-list__article">
        <aside class="sc-list__aside"></aside>
        <section>
          <p class="sc-list__text sc-list__text--unavailable">Comment is unavailable.</p>
        </section>
      </article>
    </li>
    `
  }
}
