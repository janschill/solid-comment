document.addEventListener("DOMContentLoaded", () => {
  function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Hello webpack'

    return element;
  }

  document.body.appendChild(component());
  console.log('Solid Comment loaded')
})