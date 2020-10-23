// https://api.github.com/repos/9701ml/9701ml.github.io/git/trees/master?recursive=1

const params = new URLSearchParams(location.search)

const search = params.get('s')

/** @typedef {Object} github
 * @property {{
  path: string
  sha: string
 * }[]} items
 */

/**
 * @param {github} gh
 */
function populateSearch({ items: tree }) {
  tree.forEach(async ele => {
    const text = await fetch('/tools/' + ele.path).then(res => res.text())
    const doc = new DOMParser().parseFromString(text, 'text/html')
    const result = document.createElement('article')
    const link = document.createElement('a')
    link.innerText = doc.querySelector('title').innerText || 'Name not found'
    link.href = '/tools/' + ele.path
    const description = document.createElement('p')
    description.innerText = doc.querySelector('meta[name="description"]').getAttribute('content') || 'Description not found'
    result.append(link, description)
    document.body.append(result)
  })
};

(async () => {
  /**
   * @type {github}
   */
  const gh = await fetch(`https://api.github.com/search/code?q=${encodeURIComponent(search)} in:file+language:html+repo:9701ml/9701ml.github.io`).then(res => res.json())
  gh.items = gh.items.filter(({path})=>path.startsWith('tools/'))
  populateSearch(gh)
})().catch(() => {
  // @ts-ignore
  document.querySelector('#error').style.display = 'block'
})
