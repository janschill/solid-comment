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
import Time from '../util/time'

export class Comment extends SolidModel {
  constructor (comment) {
    super()
    this.author = comment.author
    this.time = new Date(comment.time)
    this.text = comment.text
    this.resourceContainerUrl = this.getResourceContainerUrl()
    this.resourceUrl = this.getResourceUrl()
    this.timeStripped = Time.toIsoStripped(this.time)
  }

  getResourceContainerUrl () {
    const root = SolidClient.rootUrl(this.author.webIdUrl)

    return `${root}/${config().resourceContainerPath}/`
  }

  getResourceUrl () {
    const fileExtension = '.ttl'

    return `${this.resourceContainerUrl}${this.timeStripped}${fileExtension}`
  }

  static async all () {
    // const client = new SolidClient();
    const commentAuthors = config().webIdsOfAuthors

    if (commentAuthors.length > 0) {
      await this.fetchComments(commentAuthors)
    }
  }

  static async fetchComments (commentAuthors) {
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
  }
}
