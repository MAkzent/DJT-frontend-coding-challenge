<template>
  <div class="error-screen">
    <span role="img" aria-label="Sad face emoji for error page">😔</span>
    <p class="error-screen-message">
      Unable to fetch issues. Please check if the repository name is correct, or
      try to refresh the page.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class RepoErrorScreen extends Vue {}
</script>

<style scoped lang="scss">
@import '~/theme/colors';

.error-screen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  flex-direction: column;
}

.error-screen-message {
  font-size: 16px;
  margin-top: 8px;
  color: $color-gray;
}
</style>
