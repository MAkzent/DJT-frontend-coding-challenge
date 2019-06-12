<template>
  <div class="tc">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h2> GitHub Issue Viewer</h2>
    <input
      class="w-80"
      type="text" ref="url"
      placeholder="Paste a link to a Github repo"
      v-model="url">
    <button @click="goToIssuesPage">Search</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      url: ''
    };
  },
  mounted () {
    this.$refs.url.focus();
  },
  methods: {
    goToIssuesPage: function () {
      // 'https://github.com/facebook/react'.split('/')
      // ["https:", "", "github.com", "facebook", "react"]
      const user = this.url.split('/')[3];
      const repo = this.url.split('/')[4];

      this.$router.push({
        name: 'issues',
        params: { user, repo }
      });
    }
  }
}
</script>
