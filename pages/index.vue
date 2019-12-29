<template>
  <div class="container">
    <div class="content">
      <h1 class="title">
        GitHub Issue Viewer
      </h1>
      <div class="input-wrapper">
        <img
          src="~/assets/icons/search.svg"
          class="search-icon"
          alt="search icon"
        />
        <input
          v-model="url"
          class="input"
          placeholder="Paste a link to a GitHub repo!"
          @keydown.enter="goToRepoPage(url)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { getGithubRepoAndOwner } from '~/utils/url'

@Component({ transition: 'bounce' })
export default class Index extends Vue {
  url = ''

  goToRepoPage(url: string) {
    try {
      const { owner, repo } = getGithubRepoAndOwner(url)
      this.$router.push({
        path: `/issues?owner=${owner}&repo=${repo}`,
      })
    } catch (error) {
      alert(error.message)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/theme/colors';

.container {
  background: $color-red;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.content {
  max-width: 720px;
  width: 100%;
  margin: 0 24px;
}

.title {
  font-size: 48px;
  color: $color-white;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
}

.input {
  width: 100%;
  height: 76px;
  box-shadow: 0 12px 18px 0 rgba($color-dark-gray, 0.3);
  background: $color-white;
  border: none;
  padding: 0 20px 0 76px;
  font-size: 28px;
  color: $color-gray;

  &::placeholder {
    color: $color-light-gray;
    font-weight: 300;
  }

  @media (max-width: 480px) {
    height: 48px;
    padding: 0 16px 0 48px;
    font-size: 16px;
  }
}

.input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  width: 28px;
  top: 24px;
  left: 24px;

  @media (max-width: 480px) {
    width: 20px;
    top: 14px;
    left: 14px;
  }
}
</style>
