import {
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl
} from '@inrupt/solid-client'
import { VCARD } from '@inrupt/vocab-common-rdf'

export default class SolidAgent {
  async fetchProfile (webIdUrl) {
    const profileDataset = await getSolidDataset(webIdUrl)
    const profile = getThing(
      profileDataset,
      webIdUrl
    )
    this.webIdUrl = webIdUrl
    this.fullName = getStringNoLocale(profile, VCARD.fn)
    this.photo = getUrl(profile, VCARD.hasPhoto)
    this.organizationName = getStringNoLocale(profile, VCARD.organization_name)
    this.role = getStringNoLocale(profile, VCARD.role)
  }

  initials () {
    return this.fullName.split(' ').reduce((acc, el) => acc + el[0], '')
  }
}
