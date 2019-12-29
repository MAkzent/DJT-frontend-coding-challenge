<template>
  <div class="issues-card-list">
    <BaseLoadingScreen v-if="status === 'loading'" key="loading-screen" />
    <IssuesCardListErrorScreen
      v-else-if="status === 'failed'"
      key="error-screen"
    />
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
      <IssuesCardListPagination :total-page-number="lastPage" />
    </div>
    <IssuesCardListEmptyScreen
      v-else
      key="empty-screen"
      :owner="owner"
      :repo="repo"
      :active-menu="activeMenu"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import BaseIssueCard from '~/components/BaseIssueCard.vue'
import BaseLoadingScreen from '~/components/BaseLoadingScreen.vue'
import { Menu } from '~/components/IssuesFilterMenu.vue'
import IssuesCardListPagination from '~/components/IssuesCardListPagination.vue'
import IssuesCardListErrorScreen from '~/components/IssuesCardListErrorScreen.vue'
import IssuesCardListEmptyScreen from '~/components/IssuesCardListEmptyScreen.vue'
import { Issue, PullRequest } from '~/serverMiddleware/api'
import {
  listIssuesForRepo,
  listPullRequestsForRepo,
} from '~/serverMiddleware/client'
import { getLastPageFromLinkHeaders } from '~/utils/githubPagination'

const ITEM_PER_PAGE = 30

@Component({
  components: {
    BaseIssueCard,
    BaseLoadingScreen,
    IssuesCardListPagination,
    IssuesCardListErrorScreen,
    IssuesCardListEmptyScreen,
  },
})
export default class IssuesCardList extends Vue {
  @Prop({ type: String, required: true }) readonly owner!: string
  @Prop({ type: String, required: true }) readonly repo!: string
  @Prop({ type: String, required: true }) readonly activeMenu!: Menu
  @Prop({ type: Number, required: true }) readonly currentPage!: number

  data: Array<Issue | PullRequest> = []
  lastPage = 1
  status: 'loading' | 'success' | 'failed' = 'loading'

  mounted() {
    this.fetchData()
  }

  @Watch('owner')
  @Watch('repo')
  @Watch('activeMenu')
  @Watch('currentPage')
  onPropsChanged() {
    this.fetchData()
  }

  async fetchData() {
    this.status = 'loading'
    try {
      const {
        data,
        headers: { link },
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
        page: this.currentPage,
      })
    } else {
      return listIssuesForRepo(this.owner, this.repo, {
        state: this.activeMenu,
        per_page: ITEM_PER_PAGE,
        page: this.currentPage,
      })
    }
  }
}
</script>

<style scoped lang="scss">
.issues-card-list {
  height: 100%;
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
