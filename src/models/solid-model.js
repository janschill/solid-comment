import { ActiveRecord } from './active-record'
import { config } from '../config'
import {
  addStringNoLocale,
  addUrl,
  createSolidDataset,
  createThing,
  saveSolidDatasetAt,
  setThing
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { SCHEMA_INRUPT_EXT, RDFS } from '@inrupt/vocab-common-rdf'
import { SolidClient } from './solid-client'
import store from '../store'
import Time from '../util/time'
import CommentAclManager from '../comment-acl-manager'

export class SolidModel extends ActiveRecord {
  constructor (comment) {
    super()
    this.timeStripped = Time.toIsoStripped(new Date(comment.time))
    this.resourceContainerUrl = this.getResourceContainerUrl(comment.author)
    this.resourceUrl = this.getResourceUrl()
  }

  getResourceContainerUrl (author) {
    const root = SolidClient.rootUrl(author.webIdUrl)

    return `${root}/${config().resourceContainerPath}/`
  }

  getResourceUrl () {
    const fileExtension = '.ttl'

    return `${this.resourceContainerUrl}${this.timeStripped}${fileExtension}`
  }

  asRdfDataset () {
    let dataset = createSolidDataset()
    let thing = createThing({ url: this.resourceUrl, name: `${this.timeStripped}` })
    thing = addUrl(thing, RDFS.NS('type'), SCHEMA_INRUPT_EXT.NS('UserComments'))
    thing = addUrl(thing, SCHEMA_INRUPT_EXT.NS('creator'), this.author.webIdUrl)
    thing = addStringNoLocale(thing, SCHEMA_INRUPT_EXT.NS('commentText'), this.text)
    thing = addStringNoLocale(thing, SCHEMA_INRUPT_EXT.NS('commentTime'), this.time)
    dataset = setThing(dataset, thing)

    return dataset
  }

  // move this to active-record?
  async saveToPod () {
    const solidClient = new SolidClient()
    const session = await solidClient.session()

    try {
      if (session.info.isLoggedIn) {
        const resourceDataset = this.asRdfDataset()
        const webId = store.state.session.data.session.info.webId
        await saveSolidDatasetAt(this.resourceUrl, resourceDataset, { fetch: fetch })
        const commentAclManager = new CommentAclManager({ comment: this, agentWebId: webId, eventVisibility: config().eventVisibility })
        commentAclManager.configureAcl()
      }
    } catch (e) {
      console.log('No authorized session found.', e)
    }
  }
}
