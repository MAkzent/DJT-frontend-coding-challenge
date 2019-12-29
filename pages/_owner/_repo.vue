<template>
  <div class="container">
    <header class="header">
      <nuxt-link class="app-name" to="/">GitHub Issue Viewer</nuxt-link>
      <a :href="repoUrl" class="repo-url">{{ repoUrl }}</a>
    </header>
    <RepoFilterMenu :active-menu="activeMenu" />
    <main class="content">
      <BaseLoadingScreen v-if="status === 'loading'" key="loading-screen" />
      <RepoErrorScreen v-else-if="status === 'failed'" key="error-screen" />
      <div v-else-if="data.length" key="grid-screen">
        <transition-group name="card" class="card-grid" appear>
          <div v-for="issueOrPr in data" :key="issueOrPr.id" class="card-item">
            <BaseIssueCard
              :title="issueOrPr.title"
              :body="issueOrPr.body"
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
import axios from 'axios'
import BaseIssueCard from '~/components/BaseIssueCard.vue'
import BaseLoadingScreen from '~/components/BaseLoadingScreen.vue'
import RepoFilterMenu, { Menu, MenuText } from '~/components/RepoFilterMenu.vue'
import ThePagination from '~/components/ThePagination.vue'
import RepoErrorScreen from '~/components/RepoErrorScreen.vue'
import { Issue, PullRequest } from '~/serverMiddleware/api'
import { getLastPageFromLinkHeaders } from '~/utils/githubPagination'

const ITEM_PER_PAGE = 30

@Component({
  components: {
    BaseIssueCard,
    BaseLoadingScreen,
    RepoFilterMenu,
    ThePagination,
    RepoErrorScreen
  },
  transition: 'bounce'
})
export default class Repo extends Vue {
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

  get activeMenu() {
    return this.$route.query.menu || Menu.All
  }

  get currentPage() {
    return +this.$route.query.page || 1
  }

  async fetchData() {
    this.status = 'loading'
    try {
      let url
      if (this.activeMenu === Menu.Pr) {
        url = `/api/repos/${this.owner}/${this.repo}/pulls?state=all&page=${this.currentPage}&per_page=${ITEM_PER_PAGE}`
      } else {
        url = `/api/repos/${this.owner}/${this.repo}/issues?state=${this.activeMenu}&page=${this.currentPage}&per_page=${ITEM_PER_PAGE}`
      }
      const {
        data,
        headers: { link }
      } = await axios.get(url)
      this.lastPage = getLastPageFromLinkHeaders(link)
      this.data = data
      this.status = 'success'
    } catch (error) {
      this.status = 'failed'
    }
  }

  get owner() {
    return this.$route.params.owner
  }

  get repo() {
    return this.$route.params.repo
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
