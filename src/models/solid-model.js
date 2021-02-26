import { ActiveRecord } from './active-record'
import { config } from '../config'
import {
  addStringNoLocale,
  addUrl,
  createAcl,
  createAclFromFallbackAcl,
  createSolidDataset,
  createThing,
  getAgentResourceAccess,
  getPublicResourceAccess,
  getResourceAcl,
  getSolidDatasetWithAcl,
  hasAccessibleAcl,
  hasFallbackAcl,
  hasResourceAcl,
  saveAclFor,
  saveSolidDatasetAt,
  setAgentResourceAccess,
  setPublicResourceAccess,
  setThing
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { SCHEMA_INRUPT_EXT, RDFS } from '@inrupt/vocab-common-rdf'
import { SolidClient } from './solid-client'
import store from '../store'
import Time from '../util/time'

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
        const eventVisibility = config().eventVisibility

        // Extra careful that we have a WebId here
        if (webId) {
          await this.configureAcl(eventVisibility, webId)
        }
      }
    } catch (e) {
      console.log('No authorized session found.', e)
    }
  }

  async configureAcl (eventVisibility, agentWebId) {
    switch (eventVisibility) {
      case 'public':
        // We need to set this for every event, because if an event changes
        // it visibility, we don't have to iterate every resource, but can
        // just change it for the container
        await this.setAcl(this.resourceUrl, [
          { target: 'agent', webId: agentWebId, access: { read: false, write: false, append: false, control: true } },
          { taget: 'public', access: { read: true, write: false, append: false, control: false } }
        ])
        await this.setAcl(this.resourceContainerUrl, [
          { target: 'agent', webId: agentWebId, access: { read: false, write: false, append: false, control: true } },
          { taget: 'public', access: { read: true, write: false, append: false, control: false } }
        ])
        break
      case 'private':
        await this.setAcl(this.resourceContainerUrl, [
          { target: 'agent', webId: agentWebId, access: { read: false, write: false, append: false, control: true } },
          { taget: 'public', access: { read: false, write: false, append: false, control: false } }
        ])
        await this.setAcl(this.resourceUrl, [
          { target: 'agent', webId: agentWebId, access: { read: false, write: false, append: false, control: true } },
          { taget: 'public', access: { read: true, write: false, append: false, control: false } }
        ])
        break
      default:
        break
    }
  }

  fetchOrCreateResourceAcl (resourceDataset) {
    let resourceAcl
    if (!hasResourceAcl(resourceDataset)) {
      if (!hasAccessibleAcl(resourceDataset)) {
        throw new Error(
          'The current user does not have permission to change access rights to this Resource.'
        )
      }
      if (!hasFallbackAcl(resourceDataset)) {
        resourceAcl = createAcl(resourceDataset)
      }
      resourceAcl = createAclFromFallbackAcl(resourceDataset)
    } else {
      resourceAcl = getResourceAcl(resourceDataset)
    }

    return resourceAcl
  }

  async setAcl (resourceUrl, rules) {
    const resourceDataset = await getSolidDatasetWithAcl(resourceUrl, { fetch: fetch })
    const resourceAcl = this.fetchOrCreateResourceAcl(resourceDataset)
    let updatedAcl

    rules.forEach(rule => {
      switch (rule.target) {
        case 'agent':
          // if (!this.hasSameAccess(rule.target, resourceAcl, rule.access, rule.webId)) {
          updatedAcl = setAgentResourceAccess(resourceAcl, 'https://janschill.net/profile/card#me', {
            read: false, write: false, append: false, control: true
          })
          // }
          break
        case 'public':
          // if (!this.hasSameAccess(rule.target, resourceAcl, rule.access, rule.webId)) {
          updatedAcl = setPublicResourceAccess(resourceAcl, rule.access)
          // }
          break
        default:
          break
      }
    })

    await saveAclFor(resourceDataset, updatedAcl, { fetch: fetch })
  }

  hasSameAccess (target, acl, accessWanted, webId) {
    switch (target) {
      case 'agent':
        return this.compareAccessObjects(getAgentResourceAccess(acl, webId), accessWanted)
      case 'public':
        return this.compareAccessObjects(getPublicResourceAccess(acl), accessWanted)
      default:
        break
    }
  }

  // Access objects always come with the same keys:
  // append, control, read and write
  compareAccessObjects (obj1, obj2) {
    return obj1.append === obj2.append &&
      obj1.control === obj2.control &&
      obj1.read === obj2.read &&
      obj1.write === obj2.write
  }
}
