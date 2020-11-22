import DOMNode from './dom-node.js';

export default class CommentNode extends DOMNode {
  constructor() {
    super({
      type: 'div',
      innerHTML: '',
      classList: ['solid-comment-container']
    });

    this.createHeader();
    this.createList();
    this.createForm();
  }

  createHeader() {
    this.$header = new DOMNode({
      type: 'header',
      innerHTML: '',
      classList: ['flex', 'justify-between']
    });
    this.createTitle();
    this.$title.append(this.$header.$node);
    this.$navigation = new DOMNode({ type: 'nav', innerHTML: '', classList: [] });
    this.$navigation.append(this.$header.$node);
    this.createLoginButton()
    this.$loginButton.append(this.$navigation.$node);
    this.createLogoutButton();
    this.$logoutButton.append(this.$navigation.$node);
    this.$header.append(this.$node);
  }

  createTitle() {
    this.$title = new DOMNode({
      type: 'h2',
      innerHTML: 'Comments',
      classList: ['solid-comment-title', 'text-3xl']
    });
  }

  createLoginButton() {
    const classes = `solid-comment-button
      solid-comment-button--login
      ml-3 bg-white py-2 px-3
      border border-gray-300
      rounded-md shadow-sm text-sm
      leading-4 font-medium text-gray-700
      hover:bg-gray-50 focus:outline-none
      focus:ring-2 focus:ring-offset-2
      focus:ring-indigo-500
    `.split(' ').filter(el => el !== '').map(el => el.trim());
    this.$loginButton = new DOMNode({
      type: 'button',
      innerHTML: 'Login',
      classList: classes
    });
  }

  createLogoutButton() {
    const classes = `solid-comment-button
      solid-comment-button--logout
      ml-3 bg-white py-2 px-3
      border border-gray-300
      rounded-md shadow-sm text-sm
      leading-4 font-medium text-gray-700
      hover:bg-gray-50 focus:outline-none
      focus:ring-2 focus:ring-offset-2
      focus:ring-indigo-500
    `.split(' ').filter(el => el !== '').map(el => el.trim());
    this.$logoutButton = new DOMNode({
      type: 'button',
      innerHTML: 'Logout',
      classList: classes
    });
  }

  createList() {
    this.$ul = new DOMNode({
      type: 'ul',
      innerHTML: 'No comments so far',
      classList: ['solid-comment-list', 'py-5']
    });
    this.$ul.append(this.$node);
  }

  createForm() {
    this.$form = new DOMNode({
      type: 'form',
      innerHTML: '',
      classList: ['solid-comment-form']
    });
    const $label = this.createInputField().label;
    const $inputField = this.createInputField().inputField;
    const classes = `solid-comment-button
      solid-comment-button--send
      py-2 px-3 border border-transparent
      shadow-sm text-sm font-medium
      rounded-md text-white bg-indigo-600
      hover:bg-indigo-700 focus:outline-none
      focus:ring-2 focus:ring-offset-2
      focus:ring-indigo-500
    `.split(' ').filter(el => el !== '').map(el => el.trim());
    const $submitButton = new DOMNode({
      type: 'button',
      innerHTML: 'Send',
      classList: classes
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
      classList: ['solid-comment-label', 'text-sm']
    });
    $label.$node.setAttribute('for', labelId)
    const $inputField = new DOMNode({
      type: 'textarea',
      innerHTML: '',
      classList: ['solid-comment-input', 'bg-gray-100', 'rounded',
        'leading-normal',
        'resize-none',
        'w-full',
        'h-10',
        'py-2',
        'px-3']
    });
    $inputField.$node.setAttribute('placeholder', 'Your comment');
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
