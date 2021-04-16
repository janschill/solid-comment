import {
  createAcl,
  createAclFromFallbackAcl,
  getAgentAccess,
  getAgentResourceAccess,
  getPublicDefaultAccess,
  getPublicResourceAccess,
  getResourceAcl,
  getSolidDatasetWithAcl,
  hasAccessibleAcl,
  hasFallbackAcl,
  hasResourceAcl,
  saveAclFor,
  setAgentDefaultAccess,
  setAgentResourceAccess,
  setPublicResourceAccess
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'

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

  async setAcl (resourceUrl, rules) {
    const resourceDataset = await getSolidDatasetWithAcl(resourceUrl, { fetch: fetch })
    const resourceAcl = this.getOrCreateResourceAcl(resourceDataset)
    let updatedAcl

    rules.forEach(rule => {
      switch (rule.target) {
        case 'agent':
          // if (!this.hasSameAccess(rule.target, resourceAcl, rule.access, rule.webId)) {
          updatedAcl = setAgentResourceAccess(resourceAcl, rule.webId, rule.access)
          // https://forum.solidproject.org/t/solved-solid-client-create-acl-for-container-makes-agent-lose-control/4029/3
          // set default ACL for children of container
          updatedAcl = setAgentDefaultAccess(resourceAcl, rule.webId, rule.access)
          // }
          break
        case 'public':
          // if (!this.hasSameAccess(rule.target, resourceAcl, rule.access, rule.webId)) {
          updatedAcl = setPublicResourceAccess(resourceAcl, rule.access)
          // }
          break
        default:
          break
      }
    })

    await saveAclFor(resourceDataset, updatedAcl, { fetch: fetch })
  }

  hasSameAccess (target, acl, accessWanted, webId) {
    switch (target) {
      case 'agent':
        return this.compareAccessObjects(getAgentResourceAccess(acl, webId), accessWanted)
      case 'public':
        return this.compareAccessObjects(getPublicResourceAccess(acl), accessWanted)
      default:
        break
    }
  }

  // Access objects always come with the same keys:
  // eg.: { append: false, control: false, read: true, write: false }
  compareAccessObjects (obj1, obj2) {
    return obj1.append === obj2.append &&
      obj1.control === obj2.control &&
      obj1.read === obj2.read &&
      obj1.write === obj2.write
  }
}
