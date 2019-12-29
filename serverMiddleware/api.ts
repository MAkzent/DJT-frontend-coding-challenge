import Octokit from '@octokit/rest'
import Dotenv from 'dotenv'
import Fastify from 'fastify'

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

const fastify = Fastify({ logger: true })

fastify.get<{}, { owner: string; repo: string }>(
  '/repos/:owner/:repo/issues',
  async ({ params: { owner, repo } }) => {
    const issues = await getAllIssues(owner, repo)
    return issues
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
