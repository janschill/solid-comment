import Component from './component.js'

export default class Button extends Component {
  constructor(params) {
    super(params)
  }

  disableButton() {
    this.element.setAttribute('disabled', 'true');
  }

  enableButton() {
    this.element.removeAttribute('disabled');
  }
}
