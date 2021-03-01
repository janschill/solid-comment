import SolidClient from './auth/solid-client'
import Home from './home'

export default class App {
  constructor () {
    new Home().instantiateComponents()
  }

  // We still need to click on login after refresh
  async boot () {
    this.solidClient = new SolidClient()
    await this.solidClient.checkSession()
  }
}
