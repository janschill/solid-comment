import Component from './component'
import store from '../store/index'

export default class WebId extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.solid-comment-webid')
    })
  }

  render () {
    const content = store.state.webId.data ? `Current WebID: ${store.state.webId.data}` : ''
    this.element.innerHTML = content
  }
}
