import { ActiveRecord } from './active-record'
import { config } from '../config'
import {
  addStringNoLocale,
  addUrl,
  createSolidDataset,
  createThing,
  saveSolidDatasetAt,
  setPublicResourceAccess,
  setThing,
  getSolidDatasetWithAcl,
  hasResourceAcl,
  hasFallbackAcl,
  hasAccessibleAcl,
  createAcl,
  createAclFromFallbackAcl,
  getResourceAcl,
  setAgentResourceAccess,
  saveAclFor
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { SCHEMA_INRUPT_EXT, RDFS } from '@inrupt/vocab-common-rdf'
import { SolidClient } from './solid-client'
import store from '../store'

export class SolidModel extends ActiveRecord {
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
        // const updatedDataset = await this.setAcl(resourceDataset)
        // console.log(updatedDataset)
        await saveSolidDatasetAt(this.resourceUrl, resourceDataset, { fetch: fetch })
        // await this.configureAcl(resourceUrl)
      }
    } catch (e) {
      console.log('No authorized session found.', e)
    }
  }

  async setAcl (resourceDataset) {
    const resourceAcl = createAcl(resourceDataset)
    const dataset = setPublicResourceAccess(
      resourceAcl,
      { read: true, append: true, write: true, control: false }
    )

    return dataset
  }

  async configureAcl (resourceUrl) {
    const eventVisibility = config().eventVisibility

    switch (eventVisibility) {
      case 'public':
        console.log('public event')
        this.setPublicAcl(resourceUrl)
        break
      case 'private':
        console.log('private event')
        break
      default:
        break
    }
  }

  async setPublicAcl (resourceUrl) {
    // const updatedDataset = null
    const root = SolidClient.rootUrl(this.author.webIdUrl)
    const containerUrl = `${root}/${config().resourceContainerPath}`
    // Fetch the SolidDataset and its associated ACLs, if available:
    const myDatasetWithAcl = await getSolidDatasetWithAcl(containerUrl, { fetch: fetch })
    console.log(containerUrl)

    // Obtain the SolidDataset's own ACL, if available,
    // or initialise a new one, if possible:
    let resourceAcl
    if (!hasResourceAcl(myDatasetWithAcl)) {
      if (!hasAccessibleAcl(myDatasetWithAcl)) {
        throw new Error(
          'The current user does not have permission to change access rights to this Resource.'
        )
      }
      if (!hasFallbackAcl(myDatasetWithAcl)) {
        // throw new Error(
        //   'The current user does not have permission to see who currently has access to this Resource.'
        // )
        // Alternatively, initialise a new empty ACL as follows,
        // but be aware that if you do not give someone Control access,
        // **nobody will ever be able to change Access permissions in the future**:
        resourceAcl = createAcl(myDatasetWithAcl)
      }
      resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl)
    } else {
      resourceAcl = getResourceAcl(myDatasetWithAcl)
    }

    // Give someone Control access to the given Resource:
    const webId = store.state.session.data.session.info.webId
    let updatedAcl = setAgentResourceAccess(
      resourceAcl,
      webId,
      { read: false, append: false, write: false, control: true }
    )
    updatedAcl = setPublicResourceAccess(
      resourceAcl,
      { read: true, append: false, write: false, control: false }
    )
    // Now save the ACL:
    await saveAclFor(myDatasetWithAcl, updatedAcl, { fetch: fetch })

    // const hasAcl = hasResourceAcl(resourceDataset)
    // console.log('hasAcl', hasAcl)
    // if (!hasAcl) {
    //   updatedDataset = createAcl(resourceDataset)
    //   console.log(updatedDataset)
    // }
    // console.log(myDatasetWithAcl)

    // Set public ACL
    // const resourceDataset = this.asRdfDataset()
    // const updatedAcl = setPublicResourceAccess(
    //   resourceAcl,
    //   { read: true, append: true, write: false, control: false }
    // )
  }
}
