import { SolidModel } from "./solid-model";

export class Comment extends SolidModel {

  constructor(comment) {
    super();
    this.author = comment.author
    this.date = comment.date
    this.text = comment.text
  }
}
