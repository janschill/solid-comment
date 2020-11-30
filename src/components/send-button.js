import Button from '../../lib/button.js';
import store from '../store/index.js';
import Comment from '../models/comment.js';

export default class SendButton extends Button {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-button--send')
    });
    const client = store.state.client;
    this.element.addEventListener('click', event => {
      event.preventDefault();
      const inputField = document.querySelector('.solid-comment-input');
      const inputValue = inputField.value;

      const comment = new Comment({ message: inputValue, rdfNode: null });
      store.dispatch('addComment', comment);
      const comments = store.state.comments;
      const commentsAsRDF = Comment.asRDF(comments);
      store.dispatch('updateInput', '');
      inputField.value = '';
      // solidClient.put(commentsAsRDF);
    });
  }

  render() {
    const inputValue = store.state.input;
    if (inputValue == '' || inputValue == null) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }
}
