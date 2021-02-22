import { addStringNoLocale, addUrl, createSolidDataset, createThing, setThing } from '@inrupt/solid-client'
import { ActiveRecord } from './active-record'
import Time from '../util/time'
// import { config } from '../config'
// import { SolidClient } from '../solid/solid-client'
import { SCHEMA_INRUPT_EXT, RDFS } from '@inrupt/vocab-common-rdf'

export class SolidModel extends ActiveRecord {
  async asRdf () {
    // yyyymmddThhmmssZ
    // 20210222T175141Z
    const fileName = Time.toIsoStripped(this.time)
    // const fileExtension = '.ttl'
    // const root = SolidClient.rootUrl(this.author.webIdUrl)
    // const resourceUrl = `${root}/${config().resourceContainerPath}/${fileName}${fileExtension}`
    // const datasetUrl = `${root}/${config().resourceContainerPath}`
    let dataset = createSolidDataset()
    // give URL to dataset
    // add thing to dataset
    // upload dataset
    // let thing = createThing({ url: `${resourceUrl}` });
    let thing = createThing({ name: fileName })
    thing = addUrl(thing, RDFS.NS('type'), SCHEMA_INRUPT_EXT.NS('UserComments'))
    thing = addUrl(thing, SCHEMA_INRUPT_EXT.NS('creator'), this.author.webIdUrl)
    thing = addStringNoLocale(thing, SCHEMA_INRUPT_EXT.NS('commentText'), this.text)
    thing = addStringNoLocale(thing, SCHEMA_INRUPT_EXT.NS('commentTime'), this.time)
    // saveFileInContainer()
    dataset = setThing(dataset, thing)
    // console.log("dataset", dataset);
    return dataset
  }
}
