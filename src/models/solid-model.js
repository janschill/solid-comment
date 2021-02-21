import { ActiveRecord } from "./active-record";

export class SolidModel extends ActiveRecord {
  constructor() {
    super();
  }

  asRdf() {
    return `
    <ex:s> <ex:p> <ex:o>
    ${this.author}
    `
  }
}
