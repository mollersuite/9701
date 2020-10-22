// https://api.github.com/repos/9701ml/9701ml.github.io/git/trees/master?recursive=1

const params = new URLSearchParams(location.search)

const search = params.get('s')

/** @typedef {Object} github
 * @property {String} sha
 * @property {{
  path: string
  sha: string
 * }[]} tree
 * @property {Boolean} truncated
 * @property {String} url
 */
/**
 * @returns {Promise<github>}
*/
async function getDir() {
  /**
   * @type {github}
   */
  const { tree } = await fetch('https://api.github.com/repos/9701ml/9701ml.github.io/git/trees/master?recursive=0').then(res => res.json())
  const sha = tree.find(obj => obj.path === 'tools').sha
  return fetch(`https://api.github.com/repos/9701ml/9701ml.github.io/git/trees/${sha}?recursive=1`).then(res => res.json())
};

/**
 * @param {github} gh
 */
function populateSearch({ tree }) {
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
  const gh = await getDir()
  populateSearch(gh)
})().catch(() => {
  // @ts-ignore
  document.querySelector('#error').style.display = 'block'
})
