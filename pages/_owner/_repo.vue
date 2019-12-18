<template>
  <div class="container">
    <header class="header">
      <nuxt-link class="app-name" to="/">GitHub Issue Viewer</nuxt-link>
      <a :href="repoUrl" class="repo-url">{{ repoUrl }}</a>
    </header>
    <TheFilterMenu :active-menu="activeMenu" />
    <main class="content">
      <BaseLoadingScreen v-if="loading" />
      <div v-else-if="filteredData.length" class="card-grid">
        <div v-for="issue in filteredData" :key="issue.id" class="card-item">
          <BaseIssueCard
            :title="issue.title"
            :body="issue.body"
            :labels="issue.labels"
            :is-pull-request="!!issue.pull_request"
            :is-closed="issue.state === 'closed'"
          />
        </div>
      </div>
      <div v-else class="empty-result">
        <p>
          There's no "{{ getMenuText(activeMenu).toLowerCase() }}" in
          {{ repoUrl }}.
        </p>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'
import BaseIssueCard from '~/components/BaseIssueCard.vue'
import BaseLoadingScreen from '~/components/BaseLoadingScreen.vue'
import TheFilterMenu, { Menu, MenuText } from '~/components/TheFilterMenu.vue'
import { Issue } from '~/serverMiddleware/api'

@Component({
  components: { BaseIssueCard, BaseLoadingScreen, TheFilterMenu },
  transition: 'bounce'
})
export default class Repo extends Vue {
  data: Issue[] = []
  loading = true

  async mounted() {
    const { data } = await axios.get(
      `/api/repos/${this.owner}/${this.repo}/issues`
    )
    this.data = data
    this.loading = false
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

  get activeMenu() {
    return this.$route.query.menu || Menu.All
  }

  get filteredData() {
    switch (this.activeMenu) {
      case 'open':
        return this.data.filter((d) => !d.pull_request && d.state === Menu.Open)
      case 'closed':
        return this.data.filter(
          (d) => !d.pull_request && d.state === Menu.Closed
        )
      case 'pr':
        return this.data.filter((d) => d.pull_request)
      case 'all':
      default:
        return this.data
    }
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
</style>
