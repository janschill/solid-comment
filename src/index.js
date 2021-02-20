import { addToConfig, config, addObjectToConfig } from "./config"
import App from "./app"

export class SolidComment {
  constructor(configuration) {
    addObjectToConfig(configuration);
    addToConfig("resourceContainerPath", `solid-comment/${configuration.solidCommentId}`);
    console.log(config())
  }

  async initApp() {
    window.onload = async () => {
      const app = new App();
      app.boot();
    }
  }
}

window.SolidComment = SolidComment;
