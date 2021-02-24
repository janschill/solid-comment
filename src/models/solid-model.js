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
import { SolidClient } from '../solid/solid-client'
import Time from '../util/time'

export class SolidModel extends ActiveRecord {
  asRdfDataset () {
    let dataset = createSolidDataset()
    const time = Time.toIsoStripped(this.time)
    let thing = createThing({ name: `${time}` })
    thing = addUrl(thing, RDFS.NS('type'), SCHEMA_INRUPT_EXT.NS('UserComments'))
    thing = addUrl(thing, SCHEMA_INRUPT_EXT.NS('creator'), this.author.webIdUrl)
    thing = addStringNoLocale(thing, SCHEMA_INRUPT_EXT.NS('commentText'), this.text)
    thing = addStringNoLocale(thing, SCHEMA_INRUPT_EXT.NS('commentTime'), this.time)
    dataset = setThing(dataset, thing)

    return dataset
  }

  // move this to active-record?
  async saveToPod () {
    const root = SolidClient.rootUrl(this.author.webIdUrl)
    const fileName = Time.toIsoStripped(this.time)
    const fileExtension = '.ttl'
    const resourceUrl = `${root}/${config().resourceContainerPath}/${fileName}${fileExtension}`
    const solidClient = new SolidClient()
    const session = await solidClient.session()

    try {
      if (session.info.isLoggedIn) {
        const resourceDataset = this.asRdfDataset()
        await saveSolidDatasetAt(resourceUrl, resourceDataset, { fetch: fetch })
      }
    } catch (e) {
      console.log('No authorized session found.', e)
    }
  }
}
