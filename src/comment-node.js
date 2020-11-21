import DOMNode from './dom-node.js';

export default class CommentNode extends DOMNode {
  constructor() {
    super({
      type: 'div',
      innerHTML: '',
      classList: ['solid-comment-container']
    });

    this.createTitle();
    this.createList();
    this.createLoginButton();
    this.createLogoutButton();
    this.createForm();
  }

  createTitle() {
    this.$title = new DOMNode({
      type: 'h2',
      innerHTML: 'Comments',
      classList: ['solid-comment-title']
    });
    this.$title.append(this.$node);
  }

  createList() {
    this.$ul = new DOMNode({
      type: 'ul',
      innerHTML: 'No comments so far',
      classList: ['solid-comment-list']
    });
    this.$ul.append(this.$node);
  }

  createLoginButton() {
    this.$loginButton = new DOMNode({
      type: 'button',
      innerHTML: 'Login with Solid',
      classList: ['solid-comment-button', 'solid-comment-button--login']
    })
    this.$loginButton.append(this.$node);
  }

  createLogoutButton() {
    this.$logoutButton = new DOMNode({
      type: 'button',
      innerHTML: 'Logout',
      classList: ['solid-comment-button', 'solid-comment-button--logout']
    })
    this.$logoutButton.append(this.$node);
  }

  createForm() {
    this.$form = new DOMNode({
      type: 'form',
      innerHTML: '',
      classList: ['solid-comment-form']
    });
    const $label = this.createInputField().label;
    const $inputField = this.createInputField().inputField;
    const $submitButton = new DOMNode({
      type: 'button',
      innerHTML: 'Send',
      classList: ['solid-comment-button', 'solid-comment-button--send']
    });
    $label.append(this.$form.$node);
    $inputField.append(this.$form.$node);
    $submitButton.append(this.$form.$node);

    this.$form.append(this.$node);
  }

  createInputField() {
    const labelId = 'solid-comment-input-field';
    const $label = new DOMNode({
      type: 'label',
      innerHTML: 'Your comment',
      classList: ['solid-comment-label']
    });
    $label.$node.setAttribute('for', labelId)
    const $inputField = new DOMNode({
      type: 'input',
      innerHTML: '',
      classList: ['solid-comment-input']
    });
    $inputField.$node.setAttribute('type', 'text');
    $inputField.$node.setAttribute('id', labelId);

    return {
      label: $label,
      inputField: $inputField
    }
  }
}

/**
 * Container
 * List of comments
 * Login
 * Comment field + button
 *
 *
 *
 *
 */
