export function removeTrailingSlashes(url: string) {
  return url.replace(/\/+$/, '')
}

export function getGithubRepoPathname(url: string) {
  const { hostname, pathname } = new URL(removeTrailingSlashes(url))
  if (hostname !== 'github.com' && hostname !== 'www.github.com') {
    throw new Error('URL is not a GitHub domain.')
  }
  if (pathname.split('/').length !== 3) {
    throw new Error('URL is not a GitHub repository homepage.')
  }
  return pathname
}
