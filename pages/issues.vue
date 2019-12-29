<template>
  <div class="container">
    <header class="header">
      <nuxt-link class="app-name" to="/">GitHub Issue Viewer</nuxt-link>
      <a :href="repoUrl" class="repo-url">{{ repoUrl }}</a>
    </header>
    <IssuesFilterMenu :active-menu="activeMenu" />
    <main class="content">
      <IssuesCardList
        :owner="owner"
        :repo="repo"
        :active-menu="activeMenu"
        :current-page="currentPage"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import IssuesFilterMenu, { Menu } from '~/components/IssuesFilterMenu.vue'
import IssuesCardList from '~/components/IssuesCardList.vue'
import { getGitHubRepoUrl } from '~/utils/url'

function isValidMenu(menu: unknown): menu is Menu {
  return Object.values(Menu).includes(menu as Menu)
}

@Component({
  components: {
    IssuesFilterMenu,
    IssuesCardList
  },
  transition: 'bounce'
})
export default class Issues extends Vue {
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
    return getGitHubRepoUrl(this.owner, this.repo)
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
}
</style>
