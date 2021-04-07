import {
  getAgentAccess,
  getSolidDataset,
  getThing
} from '@inrupt/solid-client'
import {
  fetch
} from '@inrupt/solid-client-authn-browser'

import AclManager from './acl-manager'

export default class TrustedAppAclManager extends AclManager {
  constructor (params) {
    super()
    this.agentWebId = params.agentWebId
    this.appUrl = params.appUrl
  }

  async hasControlAccess () {
    const webIdProfileDocument = await getSolidDataset(this.agentWebId, { fetch: fetch })
    const trustedAppNS = 'http://www.w3.org/ns/auth/acl#trustedApp'
    const trustedApps = getThing(
      webIdProfileDocument,
      trustedAppNS
    )
    console.log(trustedApps)
  }
}
