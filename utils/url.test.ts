import { getGithubRepoAndOwner } from './url'

describe('getGithubRepoAndOwner', () => {
  test('support github repository url', () => {
    const pathname = getGithubRepoAndOwner('https://github.com/facebook/react')
    expect(pathname).toEqual({ owner: 'facebook', repo: 'react' })
  })

  test('support url with trailing slashes', () => {
    const pathname = getGithubRepoAndOwner(
      'https://github.com/facebook/react///'
    )
    expect(pathname).toEqual({ owner: 'facebook', repo: 'react' })
  })

  test('support url with www subdomain', () => {
    const pathname = getGithubRepoAndOwner(
      'https://www.github.com/facebook/react'
    )
    expect(pathname).toEqual({ owner: 'facebook', repo: 'react' })
  })

  test('support http url', () => {
    const pathname = getGithubRepoAndOwner('http://github.com/facebook/react')
    expect(pathname).toEqual({ owner: 'facebook', repo: 'react' })
  })

  test('error when the domain is wrong', () => {
    expect(() => {
      getGithubRepoAndOwner('https://gitlab.com/facebook/react')
    }).toThrow('URL is not a GitHub domain.')

    expect(() => {
      getGithubRepoAndOwner('https://githab.net/facebook/react')
    }).toThrow('URL is not a GitHub domain.')
  })

  test('error when url is not repo homepage', () => {
    expect(() => {
      getGithubRepoAndOwner('https://github.com/facebook')
    }).toThrow('URL is not a GitHub repository homepage.')

    expect(() => {
      getGithubRepoAndOwner('https://github.com')
    }).toThrow('URL is not a GitHub repository homepage.')

    expect(() => {
      getGithubRepoAndOwner('https://github.com/facebook/react/issues')
    }).toThrow('URL is not a GitHub repository homepage.')
  })
})
