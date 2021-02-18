import "./components/comment-section"

class View {
  define() {
    customElements.define('comment-section', CommentSection, { extends: 'section' });
  }

  render() {


  }
}
