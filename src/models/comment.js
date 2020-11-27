import store from './store/index.js';

export default class Comment extends SolidModel {
  constructor(description) {
    this.description = description;
    this.createdAt = new Date.now();
  }

  asRDF() {

  }

  static all() {
    return store.state.comments
  }
}
