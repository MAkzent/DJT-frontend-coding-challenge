<template>
  <div id='issues'>
    <h1>Github Issues Viewer</h1>
    <a v-bind:href="this.searchQueryUrl">{{ this.searchQueryUrl() }}</a>
    <div>
      <button
        v-on:click="applyFilter('all')"
        v-bind:id="selectedFilter('all')"
      >
        All Issues
      </button>
      <button
        v-on:click="applyFilter('open')"
        v-bind:id="selectedFilter('open')"
      >
        Open Issues
      </button>
      <button
        v-on:click="applyFilter('closed')"
        v-bind:id="selectedFilter('closed')"
      >
        Closed Issues
      </button>
      <button
        v-on:click="applyFilter('pr')"
        v-bind:id="selectedFilter('pr')"
      >
        Pull Requests
      </button>
    </div>

    <section v-if="errored">
      <p>No issues found for this repository</p>
    </section>
    <section v-else class="container">
      <div v-if="loading">Loading...</div>
      <div class="card" v-else v-bind:key="elem.number" v-for="elem in issuesFiltered">
        <div v-if="elem.state === 'open'">
          <img src='../assets/issue_opened.png'/>
        </div>
        <div v-if="elem.state === 'closed'">
          <img src='../assets/issue_closed.png'/>
        </div>
        <div v-if="elem.pull_request">
          <img src='../assets/pr.png'/>
        </div>
        <h1 class="text-headline">{{ elem.number }}</h1>
        <p class="text-body">{{ elem.title }}</p>
        <p class="text-body">{{ elem.state }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'issues',
  data () {
    return {
      issuesArray: null,
      loading: true,
      errored: false,
      userString: '',
      repoString: '',
      filterStatus: 'all'
    }
  },
  mounted () {
    this.userString = this.$route.params.userString
    this.repoString = this.$route.params.repoString
    const apiGithubUrl = `https://api.github.com/repos/${this.userString}/${this.repoString}/issues`

    axios.get(apiGithubUrl, { params: {state: 'all'} })
      .then(response => {
        this.issuesArray = response.data
      })
      .catch(response => {
        this.errored = true
        console.log(response)
      })
      .finally(() => {
        this.loading = false
      })
  },
  computed: {
    issuesFiltered: function () {
      if (this.filterStatus === 'all') {
        return this.issuesArray
      }
      if (this.filterStatus === 'open' || this.filterStatus === 'closed') {
        let filteredArrayOpenClosed = []
        for (let i = 0; i < this.issuesArray.length; i++) {
          if (this.issuesArray[i].state === this.filterStatus) {
            filteredArrayOpenClosed.push(this.issuesArray[i])
          }
        }
        return filteredArrayOpenClosed
      }
      if (this.filterStatus === 'pr') {
        let filteredArrayPR = []
        for (let i = 0; i < this.issuesArray.length; i++) {
          if (this.issuesArray[i].pull_request) {
            filteredArrayPR.push(this.issuesArray[i])
          }
        }
        return filteredArrayPR
      }
    }
  },
  methods: {
    searchQueryUrl: function () {
      return `https://github.com/${this.userString}/${this.repoString}`
    },
    applyFilter: function (filterString) {
      this.filterStatus = filterString
    },
    selectedFilter: function (filterString) {
      return this.filterStatus === filterString
    }
  }
}
</script>
