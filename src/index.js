import "./css/reset.css";
import "./css/styles.css";
import "./css/indico.css";
import { addToConfig, config, addObjectToConfig } from "./config";
import App from "./app";

export class SolidComment {
  constructor(configuration) {
    addObjectToConfig(configuration);
    addToConfig("appName", "Solid-Comment");
    addToConfig("resourceContainerPath", `solid-comment/${configuration.solidCommentId}`);
  }

  async initApp() {
    window.onload = async () => {
      const app = new App();
      app.boot();
    }
  }
}

window.SolidComment = SolidComment;
