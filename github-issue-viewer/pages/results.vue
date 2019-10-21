<template>
  <fragment>
    <header>
      <nuxt-link to="/" class="title">
        <h1>Github Issue Viewer</h1>
      </nuxt-link>
      <a class="repoURL" target="_blank" :href="repo | formatURL">
        <div>View on GitHub</div>
        <LinkIcon />
      </a>
    </header>
    <nav>
      <nuxt-link to="/">
        <div class="search-link">
          <span class="search-link-icon">
            <SearchIcon class="search-icon" />
          </span>
          <span class="search-link-text">Search</span>
        </div>
      </nuxt-link>
    </nav>
    <main>
      <IssueList />
    </main>
  </fragment>
</template>
<script>
import { mapState } from 'vuex'
import IssueList from '../components/IssueList'
import LinkIcon from '~/assets/icons/link.svg'
import SearchIcon from '~/assets/icons/search.svg'

export default {
  components: {
    IssueList,
    LinkIcon,
    SearchIcon
  },
  filters: {
    formatURL(repo) {
      return ` https://github.com/${repo.owner}/${repo.name}/issues`
    }
  },
  computed: mapState({
    repo: (state) => state.issues.repo
  }),
  async fetch({ store, error }) {
    try {
      await store.dispatch('issues/fetchIssues')
    } catch (err) {
      error({
        statusCode: 503,
        message: 'Unable to retrieve issues at this time. Please try again.'
      })
    }
  }
}
</script>
<style lang="scss">
header {
  align-items: center;
  background-color: #e91e63;
  display: grid;
  justify-items: center;
  grid-template-areas:
    'title'
    'repoURL';

  @include for-tablet-portrait-up {
    grid-template-areas: 'title repoURL';
    justify-items: start;
  }
}

.repoURL {
  align-items: center;
  color: #880e4f;
  display: flex;
  font-size: 16px;
  font-weight: 100;
  grid-area: repoURL;
  padding: 1em;

  svg {
    height: 0.9em;
    margin-left: 8px;
    width: 0.9em;
    path {
      fill: #880e4f;
    }
  }

  @include for-tablet-portrait-up {
    justify-self: self-end;
    padding-right: 1.5em;
  }

  @include for-tablet-landscape-up {
    font-size: 24px;
    padding-right: 1.5em;
  }
}
.title {
  grid-area: title;
  color: #fff;

  h1 {
    padding-top: 1em;
    font-size: 28px;

    @include for-tablet-portrait-up {
      padding: 1em;
      font-size: 32px;
    }

    @include for-tablet-landscape-up {
      font-size: 48px;
    }
  }
}

nav {
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1em;
  padding-right: 1.5em;
  padding-top: 1.5em;
  width: 100%;

  @include for-tablet-portrait-up {
    padding-right: 2em;
    padding-top: 2em;
  }

  .search-link {
    border: 1px solid #607d8b;
    border-radius: 8px;
    color: #607d8b;
    display: flex;
    padding: 0.5em 1em 0.5em 1em;
  }

  .search-icon {
    fill: #607d8b;
    height: 0.75em;
    margin-right: 4px;
    width: 0.75em;

    @include for-tablet-landscape-up {
      height: 1em;
      margin-right: 8px;
      width: 1em;
    }
  }

  .search-link-icon,
  .search-link-text {
    vertical-align: middle;
    display: inline-block;
  }

  .search-link-text {
    font-size: 10px;

    @include for-tablet-landscape-up {
      font-size: 12px;
    }
  }
}

main {
  margin: 0 auto;
  width: 85vw;
}
</style>
