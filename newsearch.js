import { install } from 'https://cdn.skypack.dev/@github/hotkey'

const start = document.createElement('button')
start.dataset.hotkey = "' ' '"

start.addEventListener('click', () => {
  const search = document.createElement('iframe')
  search.src = './overlaysearch.html'
  search.frameBorder = 0
  document.body.appendChild(search)
  search.addEventListener('load', () => {
    search.focus()
    search.contentDocument.querySelector('input').focus()
  })
})

install(start)
