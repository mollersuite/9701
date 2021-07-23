export type Option = {
  name: string
  type: string | string[]
  run: (file: File) => Promise<{
    file: Blob
    name: string
  }>
}
