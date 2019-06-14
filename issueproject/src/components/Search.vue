<template>
  <div id="search">
    <h1>Github Issues Viewer</h1>
    <form class="search-form" v-on:submit.prevent="submitSearch">
      <input class="search-term" type="text" v-model="searchQuery" placeholder="Paste a link to a github respository">
    <button class="search-button" v-on:click="submitSearch"><i class="fa fa-search"></i></button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'search',
  data () {
    return {
      issuesObj: null,
      searchQuery: ''
    }
  },
  methods: {
    submitSearch: function () {
      const searchArrayOfStrings = this.searchQuery.split('/')
      const userString = searchArrayOfStrings[searchArrayOfStrings.length - 3]
      const repoString = searchArrayOfStrings[searchArrayOfStrings.length - 2]
      this.$router.push({
        name: 'issues',
        params: { userString, repoString }
      })
    }
  }
}
</script>
