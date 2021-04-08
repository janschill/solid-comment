import {
  getAgentAccess,
  getSolidDatasetWithAcl
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
    const dataset = await getSolidDatasetWithAcl(this.agentWebId, { fetch: fetch })
    const agentAccess = getAgentAccess(dataset, this.agentWebId)

    return agentAccess ?? false
  }
}
