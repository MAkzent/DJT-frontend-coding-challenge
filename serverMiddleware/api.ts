import Octokit from '@octokit/rest'
import Dotenv from 'dotenv'
import { ServerMiddleware } from '@nuxt/types'

Dotenv.config()

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

function getAllIssues(owner: string, repo: string): Promise<Issue[]> {
  return octokit.paginate(
    'GET /repos/:owner/:repo/issues',
    {
      owner,
      repo,
      state: 'all',
      per_page: 100
    },
    ({ data }) => data
  )
}

const apiServerMiddleware: ServerMiddleware = async function(req, res) {
  if (!req.url) {
    res.end()
    return
  }
  const [, , owner, repo] = req.url.split('/')
  const issues = await getAllIssues(owner, repo)
  res.write(JSON.stringify(issues))
  res.end()
}

export default {
  path: '/api',
  handler: apiServerMiddleware
}

export interface Label {
  id: number
  name: string
}

export interface Issue {
  id: number
  title: string
  body: string
  state: 'open' | 'closed'
  labels: Label[]
  // eslint-disable-next-line camelcase
  pull_request: {
    url: string
  }
}
