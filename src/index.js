import { isString, isUndefined, isNil } from 'lodash'

import './assets/css/reset.css'
import './assets/css/styles.css'
import './assets/css/indico.css'
import { addToConfig, addObjectToConfig } from './config'
import App from './app'
import Comment from './models/comment'
const packageJson = require('../package.json')

export class SolidComment {
  constructor (configuration) {
    console.log(`Solid Comment ${packageJson.version} loaded.`)
    this.syncConfiguration(configuration)
    const endpoint = configuration.serverStorageEndpointUrl
    if (!isString(endpoint) && !isNil(endpoint) && !isUndefined(endpoint)) {
      throw Error('Please specify a valid storage endpoint, that can receive JSON POST requests.')
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('Looks like we are in development mode!')
    }
  }

  syncConfiguration (configuration) {
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

window.SolidComment = SolidComment
