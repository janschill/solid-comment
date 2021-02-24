import { SolidModel } from './solid-model'
import store from '../store'
import { config } from '../config'
import { SolidClient } from '../solid/solid-client'
import { toKebabCase } from '../util/formatter'
import {
  getContainedResourceUrlAll,
  getSolidDataset,
  getStringNoLocale,
  getThingAll
} from '@inrupt/solid-client'
import { SCHEMA_INRUPT_EXT } from '@inrupt/vocab-common-rdf'
import SolidAgent from './solid-agent'

export class Comment extends SolidModel {
  constructor (comment) {
    super()
    this.author = comment.author
    this.time = new Date(comment.time)
    this.text = comment.text
  }

  static async all () {
    // const client = new SolidClient();
    const commentAuthors = config().webIdsOfAuthors
    const comments = []
    store.dispatch('setComments', { state: 'loading', data: store.state.comments.data })

    for (const webIdUrl of commentAuthors) {
      const solidAgent = new SolidAgent()
      try {
        await solidAgent.fetchProfile(webIdUrl)

        const rootContainerUrl = SolidClient.rootUrl(webIdUrl)
        const appName = toKebabCase(config().appName)
        const containerUrl = `${rootContainerUrl}/${appName}/${config().solidCommentId}/`
        const containerDataset = await getSolidDataset(containerUrl)
        if (containerDataset) {
          const containerResourceUrls = getContainedResourceUrlAll(containerDataset)

          for (const resourceUrl of containerResourceUrls) {
            const resourceDataset = await getSolidDataset(resourceUrl)
            const resources = getThingAll(resourceDataset)
            resources.forEach(resource => {
              const comment = new Comment({
                author: solidAgent,
                text: getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS('commentText')),
                time: getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS('commentTime'))
              })
              comments.push(comment)
            })
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    store.dispatch('setComments', { state: 'idle', data: comments })

    return comments
  }
}
