const STORAGE = {
  localStorage: "localStorage",
  solidPod: "solidPod"
}

export class ActiveRecord {
  constructor() {
    console.log("ActiveRecord")
    if (this.constructor === ActiveRecord) {
      throw new Error("Cannot instantiate abstract class!");
    }

    this.establishConnection(STORAGE.localStorage);
  }

  all() {
    return this.elements
  }

  insert() {


  }

  save() {

  }

  delete() {

  }

  update() {

  }

  async establishConnection(storageMechanism) {
    switch (storageMechanism) {
      case STORAGE.localStorage:
        this.establishLocalStorageConnection();
        break;
      case STORAGE.solidPod:
        this.establishSolidPodConnection();
      default:
        break;
    }
  }

  establishLocalStorageConnection() {

  }

  async establishSolidPodConnection() {

  }
}
