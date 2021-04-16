import {
  getSolidDatasetWithAcl,
  saveAclFor,
  setAgentDefaultAccess,
  setAgentResourceAccess,
  setPublicDefaultAccess
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'

import AclManager from './acl-manager'

export default class CommentContainerAclManager extends AclManager {
  constructor (params) {
    super()
    this.agentWebId = params.agentWebId
    this.containerUrl = params.containerUrl
  }

  async configureAcl () {
    const resourceDatasetWithAcl = await getSolidDatasetWithAcl(this.containerUrl, { fetch: fetch })
    const resourceAcl = this.getOrCreateResourceAcl(resourceDatasetWithAcl)
    let updatedAcl

    if (!this.hasAgentControl(resourceDatasetWithAcl)) {
      const fullAccess = { read: true, write: true, append: true, control: true }
      updatedAcl = setAgentResourceAccess(resourceAcl, this.agentWebId, fullAccess)
      updatedAcl = setAgentDefaultAccess(resourceAcl, this.agentWebId, fullAccess)
    }

    if (!this.hasPublicDefaultRead(resourceDatasetWithAcl)) {
      updatedAcl = setPublicDefaultAccess(
        resourceAcl,
        { read: true, append: true, write: false, control: false }
      )
    }

    await saveAclFor(resourceDatasetWithAcl, updatedAcl, { fetch: fetch })
  }
}
