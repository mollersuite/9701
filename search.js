// https://api.github.com/repos/9701ml/9701ml.github.io/git/trees/master?recursive=1

const params = new URLSearchParams(location.search)

const search = params.get('s');

(async () => {
  const {tree} = await fetch('https://api.github.com/repos/9701ml/9701ml.github.io/git/trees/master?recursive=1').then(res => res.json())
  if (!search) {
    console.log(tree)
  }
})().catch(console.error)
