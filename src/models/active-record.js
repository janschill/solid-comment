import store from '../store'
import { config } from '../config'
import Fetcher from './fetcher'

const STORAGE = {
  localStorage: 'localStorage',
  solidPod: 'solidPod'
}

export default class ActiveRecord {
  constructor () {
    if (this.constructor === ActiveRecord) {
      throw new Error('Cannot instantiate abstract class!')
    }

    this.connection = this.establishConnection(STORAGE.solidPod)
    this.storageEndpoint = config().serverStorageEndpointUrl
  }

  all () {
    this.connection.fetch()
    return this.elements
  }

  // TODO:
  async deleteFromApp () {
    Fetcher.delete(this.storageEndpoint, { url: this.resourceName })
  }

  async saveToApp () {
    Fetcher.postData(this.storageEndpoint, { url: this.resourceUrl })
  }

  saveToStore () {
    const comments = store.state.comments.data
    comments.unshift(this) // add to the beginning
    store.dispatch('setComments', { state: 'idle', data: comments })
  }

  deleteFromStore () {
    const comments = store.state.comments.data
    const commentsWithDeletedComment = comments.map(comment => {
      if (comment.resourceUrl === this.resourceUrl) {
        return {}
      }
      return comment
    })
    store.dispatch('setComments', { state: 'idle', data: commentsWithDeletedComment })
  }

  async establishConnection (storageMechanism) {
    switch (storageMechanism) {
      case STORAGE.localStorage:
        this.establishLocalStorageConnection()
        break
      case STORAGE.solidPod:
        this.establishSolidPodConnection()
        break
      default:
        break
    }
  }

  async establishSolidPodConnection () {
    return store.state.solidClient.data
  }
}
