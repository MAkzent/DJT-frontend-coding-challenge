import Octokit from '@octokit/rest'
import Dotenv from 'dotenv'
import Fastify from 'fastify'

Dotenv.config()

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

function getAllIssues(
  owner: string,
  repo: string,
  state: State = 'all'
): Promise<Issue[]> {
  return octokit.paginate(
    'GET /repos/:owner/:repo/issues',
    {
      owner,
      repo,
      state,
      per_page: 100
    },
    ({ data }) => data
  )
}

function getAllPullRequests(
  owner: string,
  repo: string
): Promise<PullRequest[]> {
  return octokit.paginate(
    'GET /repos/:owner/:repo/pulls',
    {
      owner,
      repo,
      state: 'all',
      per_page: 100
    },
    ({ data }) => data
  )
}

const fastify = Fastify({ logger: true })

fastify.get<{ state?: State }, { owner: string; repo: string }>(
  '/repos/:owner/:repo/issues',
  async ({ params: { owner, repo }, query: { state } }) => {
    const issues = await getAllIssues(owner, repo, state)
    return issues
  }
)

fastify.get<{ owner: string; repo: string }>(
  '/repos/:owner/:repo/pulls',
  async ({ params: { owner, repo } }) => {
    const pullRequests = await getAllPullRequests(owner, repo)
    return pullRequests
  }
)

fastify.ready()

export default {
  path: '/api',
  handler: fastify.server
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

export interface PullRequest {
  id: number
  title: string
  body: string
  labels: Label[]
  base: { label: string }
}

export type State = 'all' | 'open' | 'closed'
