document.addEventListener("DOMContentLoaded", () => {
  function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Comments'

    return element;
  }

  document.body.appendChild(component());
})

export class SolidComment {
  configure() {
    console.log('configuration')
  }
}

export const solidComment = new SolidComment()
solidComment.configure()
