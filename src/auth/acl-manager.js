import {
  createAcl,
  createAclFromFallbackAcl,
  getAgentAccess,
  getPublicDefaultAccess,
  getResourceAcl,
  hasAccessibleAcl,
  hasFallbackAcl,
  hasResourceAcl
} from '@inrupt/solid-client'

export default class AclManager {
  constructor () {
    if (this.constructor === AclManager) {
      throw new Error('Cannot instantiate abstract class!')
    }
  }

  getOrCreateResourceAcl (resourceDataset) {
    let resourceAcl
    if (!hasResourceAcl(resourceDataset)) {
      if (!hasAccessibleAcl(resourceDataset)) {
        throw new Error(
          'The current user does not have permission to change access rights to this resource.'
        )
      }
      if (!hasFallbackAcl(resourceDataset)) {
        resourceAcl = createAcl(resourceDataset)
      }
      resourceAcl = createAclFromFallbackAcl(resourceDataset)
    } else {
      resourceAcl = getResourceAcl(resourceDataset)
    }

    return resourceAcl
  }

  hasPublicDefaultRead (resourceDatasetWithAcl) {
    const publicAccess = getPublicDefaultAccess(resourceDatasetWithAcl)

    return publicAccess.read
  }

  hasAgentControl (resourceDatasetWithAcl) {
    const agentAccess = getAgentAccess(resourceDatasetWithAcl, this.agentWebId)

    return agentAccess.control
  }
}
