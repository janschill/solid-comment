import { get, isEmpty } from 'lodash'

import Component from './component'
import store from '../store'
import { emptyCommentTemplate } from '../templates/comment/empty-comment'
import { commentTemplate } from '../templates/comment/comment'

export default class Comments extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.sc-section-comments')
    })
    this.element.onclick = event => {
      this.handleCommentMenuClick(event)
    }
  }

  closeAllMenus () {
    const $menus = document.querySelectorAll('.sc-comment__menu-action-list--visible')
    for (let i = 0; i < $menus.length; i++) {
      const $menu = $menus[i]
      $menu.classList.remove('sc-comment__menu-action-list--visible')
    }
  }

  handleCommentMenuClick (event) {
    const $button = event.target.closest('button')

    if (!$button) { this.closeAllMenus(); return }
    if (!this.element.contains($button)) { this.closeAllMenus(); return }

    if ($button.classList.contains('sc-comment__menu-toggle')) {
      this.toggleCommentMenuDropdown($button)
    } else if ($button.classList.contains('sc-comment__menu-action-button')) {
      this.handleCommentMenuAction(event)
    }
  }

  getComment (event) {
    const $comment = event.target.closest('.sc-comment')
    const commentResourceUrl = $comment.dataset.resourceUrl
    const comments = get(store, 'state.comments.data')
    const comment = comments.filter(
      comment => comment.resourceUrl === commentResourceUrl
    )[0]
    return comment
  }

  handleCommentMenuAction (event) {
    const action = event.target.dataset.action
    if (action) {
      const comment = this.getComment(event)
      if (comment) {
        comment.actions(action)()
      }
    }
  }

  toggleCommentMenuDropdown ($button) {
    const $menu = $button.closest('.sc-comment__menu')
    $menu.querySelector('.sc-comment__menu-action-list')
      .classList
      .toggle('sc-comment__menu-action-list--visible')
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
        comments.forEach(comment => {
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
    return commentTemplate(comment)
  }

  htmlCommentUnavailable () {
    return emptyCommentTemplate()
  }
}
