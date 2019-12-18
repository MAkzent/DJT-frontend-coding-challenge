import { getGithubRepoPathname } from './url'

test('support github repository url', () => {
  const pathname = getGithubRepoPathname('https://github.com/facebook/react')
  expect(pathname).toEqual('/facebook/react')
})

test('support url with trailing slashes', () => {
  const pathname = getGithubRepoPathname('https://github.com/facebook/react///')
  expect(pathname).toEqual('/facebook/react')
})

test('support url with www subdomain', () => {
  const pathname = getGithubRepoPathname(
    'https://www.github.com/facebook/react'
  )
  expect(pathname).toEqual('/facebook/react')
})

test('support http url', () => {
  const pathname = getGithubRepoPathname('http://github.com/facebook/react')
  expect(pathname).toEqual('/facebook/react')
})

test('error when the domain is wrong', () => {
  expect(() => {
    getGithubRepoPathname('https://gitlab.com/facebook/react')
  }).toThrow('URL is not a GitHub domain.')

  expect(() => {
    getGithubRepoPathname('https://githab.net/facebook/react')
  }).toThrow('URL is not a GitHub domain.')
})

test('error when url is not repo homepage', () => {
  expect(() => {
    getGithubRepoPathname('https://github.com/facebook')
  }).toThrow('URL is not a GitHub repository homepage.')

  expect(() => {
    getGithubRepoPathname('https://github.com')
  }).toThrow('URL is not a GitHub repository homepage.')

  expect(() => {
    getGithubRepoPathname('https://github.com/facebook/react/issues')
  }).toThrow('URL is not a GitHub repository homepage.')
})
