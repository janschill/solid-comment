export function sanitizeHtml (htmlString) {
  const temp = document.createElement('div')
  temp.textContent = htmlString
  return temp.innerHTML
}
