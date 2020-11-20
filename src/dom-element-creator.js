export default class DomElementCreator {
  constructor(parentElementId = 'solid-comment-parent-id') {
    this.parentElementId = parentElementId;
  }

  getElement() {
    try {
      $parentElement = document.querySelector(`#${this.parentElementId}`);
      console.log($parentElement);
    } catch (error) {
      console.log(error);
    }
  }

  createElements() {

  }
}
