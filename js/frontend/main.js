import options from './options.js'

const input = document.querySelector('input')
const main = document.querySelector('main')

/**
 * @param {string} uri
 * @param {string} name
 */
function downloadURI(uri, name) {
  const link = document.createElement('a')
  document.body.append(link)
  link.download = name
  link.href = uri
  link.click()
  link.remove()
}

/**
 * @param {File} file
 * @returns {import('./types').Option[]}
 */
const get_options = (file) => {
  return options.filter((option) => {
    const types = Array.isArray(option.type) ? option.type : [option.type]
    return types.some((type) =>
      type.startsWith('.')
        ? file.name.endsWith(type)
        : file.type.startsWith(type)
    )
  })
}

input.addEventListener('change', () => {
  const file = input.files.item(0)
  for (const option of get_options(file)) {
    const btn = document.createElement('button')
    btn.textContent = option.name
    btn.addEventListener('click', async () => {
      const { file: blob, name } = await option.run(file)
      downloadURI(URL.createObjectURL(blob), name)
    })
    main.append(btn)
  }
})
