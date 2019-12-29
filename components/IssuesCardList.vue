<template>
  <div class="issues-card-list">
    <IssuesCardListErrorScreen v-if="status === 'failed'" key="error-screen" />
    <BaseLoadingScreen
      v-else-if="!issues || status === 'loading'"
      key="loading-screen"
    />
    <div v-else-if="issues.length" key="grid-screen">
      <transition-group name="card" class="card-grid" appear>
        <div v-for="issueOrPr in issues" :key="issueOrPr.id" class="card-item">
          <BaseIssueCard
            :title="issueOrPr.title"
            :body="issueOrPr.body || ''"
            :labels="issueOrPr.labels"
            :is-pull-request="!!issueOrPr.base || !!issueOrPr.pull_request"
            :is-closed="issueOrPr.state === 'closed'"
          />
        </div>
      </transition-group>
      <IssuesCardListPagination />
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
import IssuesCardListPagination from '~/components/IssuesCardListPagination.vue'
import IssuesCardListErrorScreen from '~/components/IssuesCardListErrorScreen.vue'
import IssuesCardListEmptyScreen from '~/components/IssuesCardListEmptyScreen.vue'
import { IssueOrPullRequest, Menu } from '~/store'

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

  status: 'loading' | 'idle' | 'failed' = 'idle'

  mounted() {
    this.fetchIssues()
  }

  @Watch('owner')
  @Watch('repo')
  @Watch('activeMenu')
  @Watch('currentPage')
  onPropsChanged() {
    this.fetchIssues()
  }

  async fetchIssues() {
    if (this.issues) {
      return
    }
    this.status = 'loading'
    try {
      await this.$store.dispatch('fetchIssues', {
        owner: this.owner,
        repo: this.repo,
        menu: this.activeMenu,
        perPage: ITEM_PER_PAGE,
        page: this.currentPage,
      })
      this.status = 'idle'
    } catch (error) {
      this.status = 'failed'
    }
  }

  get issues(): IssueOrPullRequest[] | undefined {
    return this.$store.getters.getIssuesByMenuAndPage(
      this.activeMenu,
      this.currentPage
    )
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
