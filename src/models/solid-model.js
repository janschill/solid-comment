import { ActiveRecord } from "./active-record";

export class SolidModel extends ActiveRecord {
  constructor() {
    super();
    console.log("SolidModel")

  }

  asRdf() {
    return `
    <ex:s> <ex:p> <ex:o>
    ${this.author}
    `
  }
}
