<template>
  <div id="app">
    <search @add:url="addUrl"></search>
    <results v-bind:url="url"></results>
  </div>
</template>

<script>
import Search from "./components/Search";
import Results from "./components/Results";
export default {
  name: "app",
  components: {
    search: Search,
    results: Results
  },
  data() {
    return {
      url: ""
    };
  },
  methods: {
    addUrl(url) {
      this.url = url;
    }
  }
};
</script>

<style>
html,
body {
  margin: 0px;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
nav {
  background-color: #e91e63;
  height: 10vh;
}
#app {
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}
</style>
