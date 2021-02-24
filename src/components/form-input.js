import Component from './component'
import store from '../store'

export default class FormInput extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#sc-comment-form__input')
    })
    this.element.oninput = () => {
      store.dispatch('setFormInput', { state: 'idle', data: this.element.value })
    }
  }

  render () {
    this.element.innerHTML = store.state.formInput.data
  }
}
