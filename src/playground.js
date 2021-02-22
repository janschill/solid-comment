
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready')
  const app = new App()

  async function main () {
    await handleIncomingRedirect()
    const solidClient = new SolidClient()

    const $solidOidcIssuer = document.querySelector('#solid-oidc-issuer')
    const $solidLoginButton = document.querySelector('#solid-login-button')
    if ($solidLoginButton && $solidOidcIssuer) {
      $solidLoginButton.addEventListener('click', async () => {
        const solidOidcIssuer = $solidOidcIssuer.value
        if (solidOidcIssuer) {
          await solidClient.login(solidOidcIssuer)
          console.log(solidClient.session)
        }
      })
    }

    console.log('isLoggedIn', solidClient.isLoggedIn())
  }

  main()
})

export class SolidComment {
  constructor (configuration) {
    this.solidCommentId = configuration.solidCommentId
    this.serverStorageEndpoint = configuration.serverStorageEndpoint
    this.webIdsOfAuthors = configuration.webIdsOfAuthors

    this.main()
  }

  async readComments () {
    const resourceUrl = `https://janschill.net/solid-comment/${this.solidCommentId}/comments.ttl`
    const dataset = await getSolidDataset(resourceUrl)
    const resource = getThing(dataset, `${resourceUrl}#it`)
    const author = getUrl(resource, SCHEMA_INRUPT_EXT.NS('creator'))
    const text = getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS('commentText'))
    const time = getStringNoLocale(resource, SCHEMA_INRUPT_EXT.NS('commentTime'))
    console.log('author', author)
    console.log('text', text)
    console.log('time', time)
    return resource
  }

  async writeComments () {

  }

  async main () {
    // const comments = await this.readComments()

    // new Comment({
    //   author: "https://janschill.net/profile/card#me",
    //   text: "My first comment",
    //   date: new Date()
    // })
    // fetch comments
    // render elements
    //
  }
}
