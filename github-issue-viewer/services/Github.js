import axios from 'axios'
import HttpStatus from 'http-status-codes'

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
})

// TODO account for pagination
export default {
  getIssues(repo) {
    return client.get(`/repos/${repo.owner}/${repo.name}/issues`)
  },
  // TODO add throttler
  async isValidRepo(repo) {
    try {
      const { status } = await client.get(`/repos/${repo.owner}/${repo.name}`)
      return status === HttpStatus.OK
    } catch (err) {
      // TODO handle client and server errors
      return false
    }
  }
}
