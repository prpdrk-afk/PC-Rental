/** Resolve files from public/ correctly in local and GitHub Pages builds. */
export default function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
