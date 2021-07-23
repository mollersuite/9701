/**
 * @param {string} type
 * @param {string} extension
 * @returns {import('./types').Option}
 */
function canvas(type, extension) {
  return {
    name: 'Convert to ' + extension,
    run: async file => {
      console.log(type, extension)
      return new Promise(resolve => createImageBitmap(file).then(bitmap => {
        const canvas = document.createElement('canvas')
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        canvas.getContext('bitmaprenderer').transferFromImageBitmap(bitmap)
        canvas.toBlob(blob => {
          resolve({
            file: blob,
            name: file.name.replace(/\.[0-9a-z]+$/i, extension)
          })
        }, type)
      }))
    },
    type: ['image/png', 'image/jpeg']
  }
}
/**
 * @type {import('./types').Option[]}
 */
const options = [{
  name: 'Echo',
  run: file => Promise.resolve({
    file,
    name: file.name
  }),
  type: ''
}, canvas('image/png', '.png'), canvas('image/jpeg', '.jpeg')]

export default options
