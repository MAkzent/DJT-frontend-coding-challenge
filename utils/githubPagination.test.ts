import { getLastPageFromLinkHeaders } from './githubPagination'

test('can extract one digit last page number', () => {
  const linkHeaders =
    '<https://api.github.com/repositories/83051917/pulls?per_page=30&page=2>; rel="prev", <https://api.github.com/repositories/83051917/pulls?per_page=30&page=2>; rel="last", <https://api.github.com/repositories/83051917/pulls?per_page=30&page=1>; rel="first"'
  const lastPage = getLastPageFromLinkHeaders(linkHeaders)
  expect(lastPage).toBe(2)
})

test('can extract many digits last page number', () => {
  const linkHeaders =
    '<https://api.github.com/repositories/83051917/pulls?per_page=30&page=2>; rel="prev", <https://api.github.com/repositories/83051917/pulls?per_page=30&page=200>; rel="last", <https://api.github.com/repositories/83051917/pulls?per_page=30&page=1>; rel="first"'
  const lastPage = getLastPageFromLinkHeaders(linkHeaders)
  expect(lastPage).toBe(200)
})

test('can swap page and per_page param', () => {
  const linkHeaders =
    '<https://api.github.com/repositories/83051917/pulls?page=2&per_page=30>; rel="prev", <https://api.github.com/repositories/83051917/pulls?page=2&per_page=30>; rel="last", <https://api.github.com/repositories/83051917/pulls?page=1&per_page=30>; rel="first"'
  const lastPage = getLastPageFromLinkHeaders(linkHeaders)
  expect(lastPage).toBe(2)
})

test('support page param alone', () => {
  const linkHeaders =
    '<https://api.github.com/repositories/83051917/pulls?page=2>; rel="prev", <https://api.github.com/repositories/83051917/pulls?page=2>; rel="last", <https://api.github.com/repositories/83051917/pulls?page=1>; rel="first"'
  const lastPage = getLastPageFromLinkHeaders(linkHeaders)
  expect(lastPage).toBe(2)
})

test('return 1 if there is no link headers', () => {
  const linkHeaders = undefined
  const lastPage = getLastPageFromLinkHeaders(linkHeaders)
  expect(lastPage).toBe(1)
})
