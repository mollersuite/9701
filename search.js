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

(async () => {
  const { tree } = await getDir()
  if (!search) {
    console.log(tree)
  }
})().catch(console.error)
