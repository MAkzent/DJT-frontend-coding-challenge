<template>
  <div class="ml4-l ml2">

    <div class="mr4">
      <h2 class="f4">GitHub Issue Viewer</h2>
      <a class="my-link black" :href="this.url">{{ this.url }}</a>
    </div>

    <div class="f5">
      <p
        class="my-link pr2 dib"
        :class="{ selected: isSelected('all') }"
        @click="setFilter('all')">
        All
      </p>
      <p
        class="my-link pr2 dib"
        :class="{ selected: isSelected('open') }"
        @click="setFilter('open')">
        Open
      </p>
      <p
        class="my-link pr2 dib"
        :class="{ selected: isSelected('closed') }"
        @click="setFilter('closed')">
        Closed
      </p>
      <p
        class="my-link pr2 dib"
        :class="{ selected: isSelected('pr') }"
        @click="setFilter('pr')">
        Pull Requests
      </p>
    </div>

    <div v-if="!loading">
      <div
        v-if="filteredIssues.length != 0"
        class="flex flex-wrap">
        <div
          class="card"
          v-for="issue in filteredIssues" :key="issue.id">
          <div class="card-title">
            <h3 class="f4 mv0 dib w-90">
              {{ issue.title }}
            </h3>
            <i :class="`fr dib v-top ${getIconClass(issue)}`"></i>
          </div>
          <div
            class="card-body"
            v-html="marked(issue.body)">
          </div>
        </div>
      </div>
      <div v-else>
        <h3>No issue found.</h3>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import marked from 'marked';

export default {
  name: 'issues',
  data () {
    return {
      loading: true,
      issues: [],
      user: '',
      repo: '',
      // Possible filters: all, open, closed, pr
      currentFilter: 'all'
    };
  },
  mounted () {
    this.user = this.$route.params.user;
    this.repo = this.$route.params.repo;
    const apiUrl = `https://api.github.com/repos/${this.user}/${this.repo}/issues`;

    axios
      .get(apiUrl, {
        params: {
          state: 'all'
        }
      })
      .then(res => {
        this.issues = res.data;
        this.loading = false;
      });
  },
  computed: {
    url: function () {
      return `https://github.com/${this.user}/${this.repo}`;
    },
    filteredIssues: function () {
      if (this.currentFilter === 'all') {
        return this.issues;
      }

      if (this.currentFilter === 'pr') {
        // we return only open pull requests
        return this.issues.filter(issue => {
          return issue.pull_request && issue.state !== 'closed';
        });
      }

      return this.issues.filter(issue => {
        return issue.state === this.currentFilter;
      });
    }
  },
  methods: {
    marked: marked,
    setFilter: function (filter) {
      this.currentFilter = filter;
    },
    isSelected: function (filter) {
      return this.currentFilter === filter;
    },
    getIconClass: function (issue) {
      if (issue.state === 'closed') {
        return 'issue-closed';
      }

      if (issue.pull_request) {
        return 'issue-pr';
      }

      return '';
    }
  }
}
</script>
