import axios from 'axios'
import queryString from 'query-string'
import { State, PullRequest, Issue } from './api'

const instance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/`,
})

export function listIssuesForRepo(
  owner: string,
  repo: string,
  options: { state?: State; page?: number; per_page?: number } = {}
) {
  return instance.get<Issue[]>(
    `/repos/${owner}/${repo}/issues?${queryString.stringify(options)}`
  )
}

export function listPullRequestsForRepo(
  owner: string,
  repo: string,
  options: { state?: State; page?: number; per_page?: number } = {}
) {
  return instance.get<PullRequest[]>(
    `/repos/${owner}/${repo}/pulls?${queryString.stringify(options)}`
  )
}
