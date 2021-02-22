import { CommentSection } from './components/comment-section'

export class View {
  define () {
    customElements.define('comment-section', CommentSection, { extends: 'section' })
  }

  render () {

  }
}
