import App from "./app"

export class SolidComment {
  constructor(configuration) {
    this.solidCommentId = configuration.solidCommentId;
    this.serverStorageEndpoint = configuration.serverStorageEndpoint;
    this.webIdsOfAuthors = configuration.webIdsOfAuthors;
    this.resourceContainerPath = `solid-comment/${this.solidCommentId}`;
  }

  async initApp() {
    window.onload = async () => {
      const app = new App();
      app.boot()
    }
  }
}

window.SolidComment = SolidComment;
