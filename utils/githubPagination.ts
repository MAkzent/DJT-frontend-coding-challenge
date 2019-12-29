import queryString from 'query-string'

const FIRST_PAGE = 1

export function getLastPageFromLinkHeaders(link: string | undefined) {
  if (!link) {
    return FIRST_PAGE
  }
  const lastPageMatch = link.match(/<([^>]+)>; rel="last"/)
  if (!lastPageMatch) {
    return FIRST_PAGE
  } else {
    return Number(queryString.parseUrl(lastPageMatch[1]).query.page)
  }
}
