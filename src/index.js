import './assets/css/reset.css'
import './assets/css/styles.css'
import './assets/css/indico.css'
import { addToConfig, addObjectToConfig } from './config'
import App from './app'

export class SolidComment {
  constructor (configuration) {
    addObjectToConfig(configuration)
    addToConfig('appName', 'Solid-Comment')
    addToConfig('resourceContainerPath', `solid-comment/${configuration.solidCommentId}`)
  }

  async initApp () {
    window.onload = async () => {
      const app = new App()
      await app.boot()
    }
  }
}

window.SolidComment = SolidComment
