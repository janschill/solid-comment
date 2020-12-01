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
      const s = client.store.sym(`https://janschill.solidcommunity.net/solid-comment/comments.ttl#comment-3`);
      const p = client.store.sym(client.RD('comment'));
      const o = client.store.literal(inputValue);
      const g = client.commentsResource;
      client.store.add(s, p, o, g);
      store.dispatch('updateInput', '');
      inputField.value = '';
      client.put(s);
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
