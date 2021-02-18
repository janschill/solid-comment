document.addEventListener("DOMContentLoaded", () => {
  function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Hello webpack'

    return element;
  }

  document.body.appendChild(component());
  console.log('Solid Comment loaded')
})

export class SolidComment {
  configure() {
    console.log('configuration')
  }
}

export const solidComment = new SolidComment()

export function helloWorld() {
	return "Hello World"
}

export function helloWorldNPM() {
	return "Hello World NPM"
}
