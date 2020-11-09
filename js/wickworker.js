/* eslint-env worker */
/* global JSZip */

importScripts('./jszip.min.js')

self.addEventListener('message', async message => {
  const { data: { blob: proj, text }} = message.data
  // @ts-ignore
  const zip = await new JSZip().loadAsync(await proj.arrayBuffer())
  const project = JSON.parse(await zip.files['project.json'].async('string')) // .wick files are just .zip files. most of the data is in project.json

  project.name = 'bruh' // Bruh.

  // this replaces every text with "bruh"
  // Clips, text, paths, etc. are stored in the project.json file. We will get the IDs of every single object, and filter it to only text.
  Object.keys(project.objects)
    .filter(id => project.objects[id].json && project.objects[id].json[0] === 'PointText') // Only objects with data which has the text type
    .forEach(id => { // Now for the actual text replacement
      project.objects[id].json[1].content = text
    })

  const blob = await zip.file('project.json', JSON.stringify(project)).generateAsync({ type: 'blob' })

  // @ts-ignore
  self.postMessage({
    blob: blob,
    meta: project.project
  })
})
