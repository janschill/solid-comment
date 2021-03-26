import {
  getIri,
  getSolidDataset,
  getStringNoLocale,
  getThing
} from '@inrupt/solid-client'
import { SCHEMA_INRUPT_EXT } from '@inrupt/vocab-common-rdf'

import { config } from '../config'
import SolidModel from './solid-model'
import store from '../store'
import SolidAgent from './solid-agent'

const authorsFetchedDataset = {}

export default class Comment extends SolidModel {
  constructor (comment) {
    super(comment)
    this.author = comment.author
    this.time = comment.time
    this.text = comment.text
  }

  actions (action) {
    switch (action) {
      case 'update':
        return () => {
          console.log('update')
        }
      case 'delete':
        return async () => {
          await this.deleteFromPod()
        }
      default:
        break
    }
  }

  static async all () {
    const commentUrlObjects = config().comments

    await this.fetchComments(commentUrlObjects)
  }

  static async fetchComments (commentUrlObjects) {
    const comments = []
    store.dispatch('setComments', { state: 'loading', data: store.state.comments.data })

    for (const commentUrlObject of commentUrlObjects) {
      try {
        const solidAgent = new SolidAgent()
        const commentDataset = await getSolidDataset(commentUrlObject.url)
        const commentThing = getThing(commentDataset, `${commentUrlObject.url}#it`)
        const authorWebId = getIri(commentThing, SCHEMA_INRUPT_EXT.NS('creator'))

        await this.fetchOrGetLocalAuthor(authorWebId, solidAgent)

        const comment = new Comment({
          author: solidAgent,
          text: getStringNoLocale(commentThing, SCHEMA_INRUPT_EXT.NS('commentText')),
          time: new Date(getStringNoLocale(commentThing, SCHEMA_INRUPT_EXT.NS('commentTime')))
        })
        comments.push(comment)
      } catch (error) {
        // when a URL/WebId cannot be fetch
        // Render comment without content
        console.log(error)

        comments.push({})
      }
    }
    store.dispatch('setComments', { state: 'idle', data: comments })
  }

  static async fetchOrGetLocalAuthor (authorWebId, solidAgent) {
    if (authorsFetchedDataset[authorWebId]) {
      const dataset = authorsFetchedDataset[authorWebId]
      solidAgent.setProfile(dataset, authorWebId)
    } else {
      const dataset = await solidAgent.fetchProfile(authorWebId)
      authorsFetchedDataset[authorWebId] = dataset
    }
  }
}
