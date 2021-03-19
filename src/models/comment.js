import {
  getContainedResourceUrlAll,
  getIri,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getThingAll
} from '@inrupt/solid-client'
import { SCHEMA_INRUPT_EXT } from '@inrupt/vocab-common-rdf'
import { kebabCase } from 'lodash'

import { config } from '../config'
import SolidModel from './solid-model'
import store from '../store'
import SolidAgent from './solid-agent'
import { originFromUrl } from '../util/url'

const authorsFetchedDataset = {}

export default class Comment extends SolidModel {
  constructor (comment) {
    super(comment)
    this.author = comment.author
    this.time = new Date(comment.time)
    this.text = comment.text
  }

  static async all () {
    // const client = new SolidClient();
    const commentUrlObjects = config().comments

    await this.fetchComments(commentUrlObjects)
  }

  static async fetchComments (commentUrlObjects) {
    const comments = []
    store.dispatch('setComments', { state: 'loading', data: store.state.comments.data })

    for (const commentUrlObject of commentUrlObjects) {
      const solidAgent = new SolidAgent()
      const commentDataset = await getSolidDataset(commentUrlObject.url)
      const commentThing = getThing(commentDataset, `${commentUrlObject.url}#it`)
      const author = getIri(commentThing, SCHEMA_INRUPT_EXT.NS('creator'))
      try {
        // Don't fetch it for every comment, rather for every author
        await solidAgent.fetchProfile(author)

        await this.fetchOrGetLocalAuthor(authorWebId, solidAgent)

        const comment = new Comment({
          author: solidAgent,
          text: getStringNoLocale(commentThing, SCHEMA_INRUPT_EXT.NS('commentText')),
          time: getStringNoLocale(commentThing, SCHEMA_INRUPT_EXT.NS('commentTime'))
        })
        comments.push(comment)
      } catch (e) {
        console.log(e)
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
    store.dispatch('setComments', { state: 'idle', data: comments })
  }

  // This should be in ActiveRecord
  saveToStore () {
    const comments = store.state.comments.data
    comments.push(this)
    store.dispatch('setComments', { state: 'idle', data: comments })
  }
}
