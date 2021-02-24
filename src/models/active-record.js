import store from '../store'

const STORAGE = {
  localStorage: 'localStorage',
  solidPod: 'solidPod'
}

export class ActiveRecord {
  constructor () {
    if (this.constructor === ActiveRecord) {
      throw new Error('Cannot instantiate abstract class!')
    }

    this.connection = this.establishConnection(STORAGE.solidPod)
  }

  all () {
    this.connection.fetch()
    return this.elements
  }

  insert () {

  }

  save () {

  }

  delete () {

  }

  update () {

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

  establishLocalStorageConnection () {

  }

  async establishSolidPodConnection () {
    return store.state.solidClient.data
  }
}
