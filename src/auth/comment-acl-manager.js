import AclManager from './acl-manager'

export default class CommentAclManager extends AclManager {
  constructor (params) {
    super()
    this.comment = params.comment
    this.agentWebId = params.agentWebId
    this.eventVisibility = params.eventVisibility
  }

  async configureAcl () {
    switch (this.eventVisibility) {
      case 'public':
        // We need to set this for every event, because if an event changes
        // it visibility, we don't have to iterate every resource, but can
        // just change it for the container
        await this.setAcl(this.comment.resourceContainerUrl, [{
          target: 'agent',
          webId: this.agentWebId,
          access: { read: true, write: true, append: true, control: true }
        },
        { target: 'public', access: { read: true, write: false, append: false, control: false } }
        ])
        await this.setAcl(this.comment.resourceUrl, [{
          target: 'agent',
          webId: this.agentWebId,
          access: { read: true, write: true, append: true, control: true }
        },
        { target: 'public', access: { read: true, write: false, append: false, control: false } }
        ])
        break
      case 'private':
        await this.setAcl(this.comment.resourceUrl, [{
          target: 'agent',
          webId: this.agentWebId,
          access: { read: true, write: true, append: true, control: true }
        },
        { target: 'public', access: { read: true, write: false, append: false, control: false } }
        ])
        await this.setAcl(this.comment.resourceContainerUrl, [{
          target: 'agent',
          webId: this.agentWebId,
          access: { read: true, write: true, append: true, control: true }
        },
        { target: 'public', access: { read: false, write: false, append: false, control: false } }
        ])
        break
      default:
        break
    }
  }
}
