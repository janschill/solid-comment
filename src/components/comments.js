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
    this.element.onclick = event => {
      const $button = event.target.closest('button') // (1)

      if (!$button) { this.closeAllMenus(); return }

      if (!this.element.contains($button)) { this.closeAllMenus(); return }

      const $menu = $button.closest('.sc-comment__menu')
      console.log($menu)
      $menu.querySelector('.sc-comment__menu-action-list')
        .classList
        .add('sc-comment__menu-action-list--visible')
    }
  }

  closeAllMenus () {
    const $menus = document.querySelectorAll('.sc-comment__menu-action-list--visible')
    for (let i = 0; i < $menus.length; i++) {
      const $menu = $menus[i]
      $menu.classList.remove('sc-comment__menu-action-list--visible')
    }
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
          html += `${isEmpty(comment) ? this.htmlCommentUnavailable() : this.htmlComment(comment)}`
        })
        html += '</ul>'
      } else {
        html = '<p>There seem to be no comments.</p>'
      }
    }

    this.element.innerHTML = html
  }

  htmlComment (comment) {
    return `
    <li class="sc-list__item">
      <article class="sc-comment">
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
                <span class="meatballs-menu">
                  <span class="circle"></span><span class="circle"></span><span class="circle"></span>
                </span>
              </button>
              <ul class="sc-comment__menu-action-list">
                <li><button data-action="update">Update</button></li>
                <li><button data-action="delete">Delete</button></li>
              </ul>
            </div>
          </header>
          <p class="sc-comment__text">${comment.text}</p>
        </section>
      </article>
    </li>
    `
  }

  htmlCommentUnavailable () {
    return `
    <li class="sc-list__item sc-list__item--unavailable">
      <article class="sc-comment">
        <aside class="sc-comment__aside"></aside>
        <section>
          <p class="sc-comment__text sc-comment__text--unavailable">Comment is unavailable.</p>
          <details class="details">
            <summary class="summary">Why is this comment unavailable?</summary>
            <p class="paragraph">This comment module is using a decentralized storage mechanism. This means that each individual comment is stored on a different machine. A user who wants to comment on this event needs a WebID and <a href="https://solidproject.org/users/get-a-pod" target="_blank">Solid pod</a>. The comments are then stored in the pods, which need to be fetched separately.</p>
            <p class="paragraph">There can be many reasons for a comment to not load. Here are the most common possibilities:</p>
            <ol class="ol">
              <li class="li">The author of the comment deleted their comment.</li>
              <li class="li">The author of the comment deleted their pod.</li>
              <li class="li">The author of the comment restricted access to their pod or comment.</li>
              <li class="li">The author’s pod provider is experiencing an outage. Try again later.</li>
              <li class="li">The administrator of this website decided to delete the reference to the comment.</li>
              <li class="li">The request to fetch the comment was interrupted by an outage. Please refresh your browser.</li>
            </ol>
          </details>
        </section>
      </article>
    </li>
    `
  }
}
