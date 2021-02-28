import store from '../store'
import { config } from '../config'
import { fetch } from '@inrupt/solid-client-authn-browser'

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
  }

  // TODO: Clean this up
  all () {
    this.connection.fetch()
    return this.elements
  }

  async saveToApp () {
    const storageEndpoint = config().serverStorageEndpointUrl
    this.postData(storageEndpoint, { url: this.resourceUrl })
  }

  async postData (url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })

    return response.json()
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
