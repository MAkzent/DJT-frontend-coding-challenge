<template>
  <div>
    <Filters
      v-show="issues.all.length"
      v-model="filter"
      @filter="applyFilter"
    />
    <transition name="fade" mode="out-in">
      <div v-if="issues[filter].length" :key="1" class="issues-container">
        <IssueItem
          v-for="issue in issues[filter]"
          :key="issue.id"
          :title="issue.title"
          :description="issue.description"
          :state="issue.state"
          :pull-request="issue.pullRequest"
          :labels="issue.labels"
        />
      </div>
      <div v-else :key="2" class="issues-empty">
        <h4>{{ issues | formatEmptyIssues }}</h4>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import IssueItem from '../components/IssueItem'
import Filters from '../components/Filters'

export default {
  components: {
    IssueItem,
    Filters
  },
  filters: {
    formatEmptyIssues(issues) {
      const noIssuesMsg =
        'No issues were found, please search for another GitHub Repository.'
      const noIssuesByFilter =
        'No issues were found, please select another filter.'
      return !issues.all.length ? noIssuesMsg : noIssuesByFilter
    }
  },
  data() {
    return {
      filter: 'all'
    }
  },
  computed: mapState({
    issues: (state) => state.issues.issues
  }),
  methods: {
    applyFilter(filter) {
      if (filter === 'pull request') filter = 'pullRequest'
      this.filter = filter
    }
  }
}
</script>
<style lang="scss">
.issues-empty {
  display: flex;
  justify-content: center;
}

.issues-container {
  max-width: 100%;
  display: grid;
  grid-auto-rows: minmax(250px, auto);
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(250px, auto));

  @include for-tablet-portrait-up {
    grid-auto-rows: minmax(250px, auto);
    grid-gap: 48px;
    grid-template-columns: repeat(auto-fill, minmax(350px, auto));
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
</style>
