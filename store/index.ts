import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Issue, PullRequest } from '~/serverMiddleware/api'
import {
  listPullRequestsForRepo,
  listIssuesForRepo,
} from '~/serverMiddleware/client'
import { getLastPageFromLinkHeaders } from '~/utils/githubPagination'

export enum Menu {
  All = 'all',
  Open = 'open',
  Closed = 'closed',
  Pr = 'pr',
}

export type IssueOrPullRequest = Issue | PullRequest

export type StoreState = {
  issues: {
    [menu in Menu]: {
      [page: number]: IssueOrPullRequest[]
    }
  }
  lastPage: number
}

export const state = (): StoreState => ({
  issues: {
    [Menu.All]: {},
    [Menu.Open]: {},
    [Menu.Closed]: {},
    [Menu.Pr]: {},
  },
  lastPage: 1,
})

export const getters: GetterTree<StoreState, unknown> = {
  getIssuesByMenuAndPage: (state) => (menu: Menu, page: number) =>
    state.issues[menu][page],
  lastPage: (state) => state.lastPage,
}

export const mutations: MutationTree<StoreState> = {
  saveIssues(
    state: StoreState,
    {
      menu,
      page,
      data,
    }: { menu: Menu; page: number; data: IssueOrPullRequest[] }
  ) {
    state.issues = {
      ...state.issues,
      [menu]: { ...state.issues[menu], [page]: data },
    }
  },
  saveLastPage(state: StoreState, lastPage: number) {
    state.lastPage = lastPage
  },
}

export const actions: ActionTree<StoreState, unknown> = {
  async fetchIssues(
    { commit },
    {
      owner,
      repo,
      menu,
      perPage,
      page,
    }: {
      owner: string
      repo: string
      menu: Menu
      perPage: number
      page: number
    }
  ) {
    let response: {
      data: IssueOrPullRequest[]
      headers: { link: string }
    }
    if (menu === Menu.Pr) {
      response = await listPullRequestsForRepo(owner, repo, {
        state: 'all',
        per_page: perPage,
        page,
      })
    } else {
      response = await listIssuesForRepo(owner, repo, {
        state: menu,
        per_page: perPage,
        page,
      })
    }
    commit('saveIssues', { menu, page, data: response.data })
    commit('saveLastPage', getLastPageFromLinkHeaders(response.headers.link))
  },
}
