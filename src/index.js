import './assets/css/reset.css'
import './assets/css/styles.css'
import './assets/css/indico.css'
import { addToConfig, addObjectToConfig } from './config'
import App from './app'
import Comment from './models/comment'
const packageJson = require('../package.json')

export default class SolidComment {
  constructor (configuration) {
    console.log(`SC: Version@${packageJson.version}`)
    this.setupConfiguration(configuration)

    if (process.env.NODE_ENV !== 'production') {
      console.log('SC: Development mode')
      import('./assets/css/development.css')
    }
  }

  setupConfiguration (configuration) {
    addObjectToConfig(configuration)
    addToConfig('appName', 'Solid-Comment')
    addToConfig('resourceContainerPath', `solid-comment/${configuration.solidCommentId}`)
  }

  async initApp () {
    const app = new App()
    await app.boot()
  }

  setComments (comments) {
    addToConfig('comments', comments)
    Comment.all()
  }

  setAppClient (appClient) {
    addToConfig('appClient', appClient)
  }
}

if (process.env.NODE_ENV !== 'production') {
  window.SolidComment = SolidComment
}
