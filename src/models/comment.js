import {
  getContainedResourceUrlAll,
  getSolidDataset,
  getStringNoLocale,
  getThingAll
} from '@inrupt/solid-client'
import { SCHEMA_INRUPT_EXT } from '@inrupt/vocab-common-rdf'

import { config } from '../config'
import SolidModel from './solid-model'
import store from '../store'
import SolidClient from '../auth/solid-client'
import SolidAgent from './solid-agent'
import { toKebabCase } from '../util/formatter'

export default class Comment extends SolidModel {
  constructor (comment) {
    super(comment)
    this.author = comment.author
    this.time = new Date(comment.time)
    this.text = comment.text
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
