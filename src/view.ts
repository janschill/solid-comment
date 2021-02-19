import { CommentSection } from "./components/comment-section";

export class View {
  constructor() {

  }

  define() {
    customElements.define('comment-section', CommentSection, { extends: 'section' });
  }

  render() {


  }
}
