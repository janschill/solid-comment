export function executeOnDOMReady(func) {
  document.addEventListener('DOMContentLoaded', func)
}
