import Octokit from '@octokit/rest'
import Dotenv from 'dotenv'
import Fastify from 'fastify'

Dotenv.config()

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const fastify = Fastify({ logger: true })

fastify.get<
  { state?: State; page?: number; per_page?: number },
  { owner: string; repo: string }
>(
  '/repos/:owner/:repo/issues',
  async (
    { params: { owner, repo }, query: { state, page, per_page: perPage } },
    reply
  ) => {
    const {
      data,
      headers: { link }
    } = await octokit.issues.listForRepo({
      owner,
      repo,
      state,
      page,
      per_page: perPage
    })
    reply.header('link', link)
    return data
  }
)

fastify.get<
  { state?: State; page?: number; per_page?: number },
  { owner: string; repo: string }
>(
  '/repos/:owner/:repo/pulls',
  async (
    { params: { owner, repo }, query: { state, page, per_page: perPage } },
    reply
  ) => {
    const {
      data,
      headers: { link }
    } = await octokit.pulls.list({
      owner,
      repo,
      state,
      page,
      per_page: perPage
    })
    reply.header('link', link)
    return data
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
  body: string | null
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
  body: string | null
  labels: Label[]
  base: { label: string }
}

export type State = 'all' | 'open' | 'closed'
