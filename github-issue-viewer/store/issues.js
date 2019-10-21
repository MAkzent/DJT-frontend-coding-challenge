import GithubService from '@/services/Github.js'

function bucketIssues(issues) {
  return issues.reduce(
    (
      acc,
      { id, title, body: description, pull_request: pullRequest, state, labels }
    ) => {
      const issue = {
        id,
        title,
        description: unescape(description),
        state,
        pullRequest: !!pullRequest,
        labels: labels.map(
          ({ name }) => `${name[0].toUpperCase()}${name.slice(1)}`
        )
      }
      acc[issue.state].push(issue)
      if (issue.pullRequest) acc.pullRequest.push(issue)
      acc.all.push(issue)

      return acc
    },
    { all: [], open: [], closed: [], pullRequest: [] }
  )
}

export const state = () => ({
  repo: {
    name: '',
    owner: ''
  },
  issues: {}
})

export const mutations = {
  SET_REPO(state, { name, owner }) {
    state.repo = {
      name,
      owner
    }
  },
  SET_ISSUES(state, issues) {
    state.issues = bucketIssues(issues)
  }
}

export const actions = {
  async fetchIssues({ state, commit }) {
    const { data } = await GithubService.getIssues(state.repo)
    return commit('SET_ISSUES', data)
  },
  setRepo({ commit }, repo) {
    return commit('SET_REPO', repo)
  }
}
