<template>
  <div class="container">
    <header class="header">
      <nuxt-link class="app-name" to="/">GitHub Issue Viewer</nuxt-link>
      <a :href="repoUrl" class="repo-url">{{ repoUrl }}</a>
    </header>
    <IssuesFilterMenu :active-menu="activeMenu" />
    <main class="content">
      <BaseLoadingScreen v-if="status === 'loading'" key="loading-screen" />
      <IssuesErrorScreen v-else-if="status === 'failed'" key="error-screen" />
      <div v-else-if="data.length" key="grid-screen">
        <transition-group name="card" class="card-grid" appear>
          <div v-for="issueOrPr in data" :key="issueOrPr.id" class="card-item">
            <BaseIssueCard
              :title="issueOrPr.title"
              :body="issueOrPr.body || ''"
              :labels="issueOrPr.labels"
              :is-pull-request="!!issueOrPr.base || !!issueOrPr.pull_request"
              :is-closed="issueOrPr.state === 'closed'"
            />
          </div>
        </transition-group>
        <ThePagination :total-page-number="lastPage" />
      </div>
      <div v-else key="empty-screen" class="empty-result">
        <p>
          There's no "{{ getMenuText(activeMenu).toLowerCase() }}" in
          {{ repoUrl }}.
        </p>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import BaseIssueCard from '~/components/BaseIssueCard.vue'
import BaseLoadingScreen from '~/components/BaseLoadingScreen.vue'
import IssuesFilterMenu, {
  Menu,
  MenuText
} from '~/components/IssuesFilterMenu.vue'
import ThePagination from '~/components/ThePagination.vue'
import IssuesErrorScreen from '~/components/IssuesErrorScreen.vue'
import { Issue, PullRequest } from '~/serverMiddleware/api'
import {
  listIssuesForRepo,
  listPullRequestsForRepo
} from '~/serverMiddleware/client'
import { getLastPageFromLinkHeaders } from '~/utils/githubPagination'

const ITEM_PER_PAGE = 30

function isValidMenu(menu: unknown): menu is Menu {
  return Object.values(Menu).includes(menu as Menu)
}

@Component({
  components: {
    BaseIssueCard,
    BaseLoadingScreen,
    IssuesFilterMenu,
    ThePagination,
    IssuesErrorScreen
  },
  transition: 'bounce'
})
export default class Issues extends Vue {
  data: Array<Issue | PullRequest> = []
  lastPage = 1
  status: 'loading' | 'success' | 'failed' = 'loading'

  mounted() {
    this.fetchData()
  }

  @Watch('activeMenu')
  onActiveMenuChanged() {
    this.fetchData()
  }

  @Watch('currentPage')
  onCurrentPageChanged() {
    this.fetchData()
  }

  get activeMenu(): Menu {
    const activeMenu = this.$route.query.menu || Menu.All
    if (!isValidMenu(activeMenu)) {
      throw new TypeError(
        `Menu from the URL should be either ${Menu.All}, ${Menu.Open}, ${Menu.Closed}, or ${Menu.Pr}.`
      )
    }
    return activeMenu
  }

  get currentPage() {
    return +this.$route.query.page || 1
  }

  async fetchData() {
    this.status = 'loading'
    try {
      const {
        data,
        headers: { link }
      } = await this.fetchIssuesOrPullRequests()
      this.lastPage = getLastPageFromLinkHeaders(link)
      this.data = data

      this.status = 'success'
    } catch (error) {
      this.status = 'failed'
    }
  }

  fetchIssuesOrPullRequests() {
    if (this.activeMenu === Menu.Pr) {
      return listPullRequestsForRepo(this.owner, this.repo, {
        state: 'all',
        per_page: ITEM_PER_PAGE,
        page: this.currentPage
      })
    } else {
      return listIssuesForRepo(this.owner, this.repo, {
        state: this.activeMenu,
        per_page: ITEM_PER_PAGE,
        page: this.currentPage
      })
    }
  }

  get owner(): string {
    const owner = this.$route.query.owner
    if (typeof owner !== 'string') {
      throw new TypeError('Owner from the URL should be string.')
    }
    return owner
  }

  get repo(): string {
    const repo = this.$route.query.repo
    if (typeof repo !== 'string') {
      throw new TypeError('Repo from the URL should be string.')
    }
    return repo
  }

  get repoUrl() {
    return `https://github.com/${this.owner}/${this.repo}`
  }

  getMenuText(menu: Menu) {
    return MenuText[menu]
  }
}
</script>

<style scoped lang="scss">
@import '~/theme/colors';

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background: $color-red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 40px;
  box-shadow: 0 8px 26px 0 rgba($color-dark-gray, 0.5);
  flex: none;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    padding: 16px 24px;
  }
}

.app-name {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.repo-url {
  font-size: 18px;
  font-weight: 300;
  color: $color-dark-red;
  word-break: break-all;
  text-decoration: none;
}

.content {
  flex: 1;
  overflow: auto;
  padding: 0 75px 75px;

  @media (max-width: 480px) {
    padding: 0 24px 24px;
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, auto));
  grid-gap: 48px;

  @media (max-width: 480px) {
    display: block;
  }
}

.empty-result {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-gray;
}

.card-item {
  transition: transform 0.4s;
  display: inline-block;
  width: 100%;

  @media (max-width: 480px) {
    width: calc(100vw - 48px);
  }
}

.card-enter,
.card-leave-to {
  opacity: 0;
  transform: scale(0);
}

.card-leave-active {
  position: absolute;
}
</style>
