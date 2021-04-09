import { v4 as uuidv4 } from 'uuid'
import {
  addStringNoLocale,
  addUrl,
  createSolidDataset,
  createThing,
  deleteFile,
  saveSolidDatasetAt,
  setThing
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { SCHEMA_INRUPT_EXT, RDFS } from '@inrupt/vocab-common-rdf'

import ActiveRecord from './active-record'
import CommentAclManager from '../auth/comment-acl-manager'
import { config } from '../config'
import SolidClient from '../auth/solid-client'
import store from '../store'
import Time from '../util/time'
import { originFromUrl } from '../util/url'

export default class SolidModel extends ActiveRecord {
  constructor (comment) {
    super()
    this.timeStripped = Time.jsToIso8601Strip(comment.time)
    this.resourceName = this.getResourceName()
    this.resourceContainerUrl = this.getResourceContainerUrl(comment.author)
    this.resourceUrl = this.getResourceUrl()
  }

  getResourceName () {
    const fileExtension = '.ttl'
    const uuid = uuidv4()

    return `${this.timeStripped}_${uuid}${fileExtension}`
  }

  getResourceContainerUrl (author) {
    const root = originFromUrl(author.webIdUrl)

    return `${root}/${config().resourceContainerPath}/`
  }

  getResourceUrl () {
    return `${this.resourceContainerUrl}${this.resourceName}`
  }

  asRdfDataset () {
    let dataset = createSolidDataset()
    let thing = createThing({ name: 'it' })
    thing = addUrl(thing, RDFS.NS('type'), SCHEMA_INRUPT_EXT.NS('UserComments'))
    thing = addUrl(thing, SCHEMA_INRUPT_EXT.NS('creator'), this.author.webIdUrl)
    thing = addStringNoLocale(thing, SCHEMA_INRUPT_EXT.NS('commentText'), this.text)
    thing = addStringNoLocale(thing, SCHEMA_INRUPT_EXT.NS('commentTime'), this.time)
    dataset = setThing(dataset, thing)

    return dataset
  }

  async saveToPod () {
    const solidClient = new SolidClient()
    const session = await solidClient.session()

    try {
      if (session.info.isLoggedIn) {
        const resourceDataset = this.asRdfDataset()
        const webId = store.state.session.data.session.info.webId
        const dataset = await saveSolidDatasetAt(this.resourceUrl, resourceDataset, { fetch: fetch })
        const commentAclManager = new CommentAclManager({
          comment: this,
          agentWebId: webId,
          eventVisibility: config().eventVisibility
        })
        commentAclManager.configureAcl()

        return dataset
      }
    } catch (e) {
      console.log('No authorized session found.', e)
    }
  }

  async deleteFromPod () {
    try {
      await deleteFile(this.resourceUrl, { fetch: fetch })
      this.deleteFromStore()
    } catch (e) {
      console.log('Error when deleting resource from pod', e)
    }
  }
}
