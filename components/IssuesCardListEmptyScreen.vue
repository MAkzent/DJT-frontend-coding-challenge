<template>
  <div class="issues-empty-screen">
    <p>There's no "{{ menuText }}" in {{ repoUrl }}.</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Menu } from '~/store'
import { MenuText } from '~/components/IssuesFilterMenu.vue'
import { getGitHubRepoUrl } from '~/utils/url'

@Component
export default class IssuesCardListEmptyScreen extends Vue {
  @Prop({ type: String, required: true }) readonly owner!: string
  @Prop({ type: String, required: true }) readonly repo!: string
  @Prop({ type: String, required: true }) readonly activeMenu!: Menu

  get repoUrl() {
    return getGitHubRepoUrl(this.owner, this.repo)
  }

  get menuText() {
    return MenuText[this.activeMenu].toLowerCase()
  }
}
</script>

<style scoped lang="scss">
@import '~/theme/colors';

.issues-empty-screen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-gray;
}
</style>
